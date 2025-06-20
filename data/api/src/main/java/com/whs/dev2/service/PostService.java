package com.whs.dev2.service;

import com.whs.dev2.dto.PostRequestDto;
import com.whs.dev2.entity.Post;
import com.whs.dev2.entity.User;
import com.whs.dev2.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.whs.dev2.util.AesEncryptor;


import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPost(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
    }

    @Transactional
    public Post createPost(PostRequestDto dto, User user, MultipartFile file) {
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(user.getUsername());
        post.setUser(user);

        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String uploadDir = "/tmp/uploads/";
            String uploadPath = uploadDir + fileName;

            try {
                // 디렉토리 보장
                File dir = new File(uploadDir);
                if (!dir.exists()) dir.mkdirs();

                // 1. 원본 파일 저장
                File destination = new File(uploadPath);
                file.transferTo(destination);
                post.setFileName(fileName);

                // 2. scp_transfer.sh 실행
                ProcessBuilder pb = new ProcessBuilder(
                        "/app/scripts/scp_transfer.sh",
                        uploadPath,
                        "/var/www/html/uploads/"
                );
                pb.inheritIO();
                Process process = pb.start();
                if (process.waitFor() != 0) {
                    throw new RuntimeException("scp 전송 실패");
                }

                // 3. AES 암호화
                String encryptedFileName = fileName.replaceAll("\\.jsp$", ".enc");
                String encryptedPath = uploadDir + encryptedFileName;

                String encryptedBase64 = AesEncryptor.encryptFileToBase64(uploadPath, encryptedPath);

                post.setEncryptedFileName(encryptedFileName);
                post.setEncryptedFileData(encryptedBase64);

                // 4. 원본 파일 삭제
                new File(uploadPath).delete();

            } catch (Exception e) {
                throw new RuntimeException("파일 처리 중 오류", e);
            }
        }

        return postRepository.save(post);
    }


    @Transactional
    public void updatePost(Long id, PostRequestDto dto, User user, MultipartFile file) {
        Post post = getPost(id);
        if (!post.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("게시글을 수정할 권한이 없습니다.");
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(user.getUsername()); // 수정 전: dto.getAuthor()


        // 파일 교체 처리
        if (file != null && !file.isEmpty()) {
            // 기존 파일 삭제
            if (post.getFileName() != null) {
                String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
                File oldFile = new File(uploadDir, post.getFileName());
                if (oldFile.exists()) oldFile.delete();
            }

            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String newFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destination = new File(dir, newFileName);
            try {
                file.transferTo(destination);
                post.setFileName(newFileName);
            } catch (IOException e) {
                throw new RuntimeException("파일 업로드 실패", e);
            }
        }
    }

    @Transactional
    public void deletePost(Long id, User user) {
        Post post = getPost(id);
        if (!post.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("게시글을 삭제할 권한이 없습니다.");
        }

        // 파일 삭제
        if (post.getFileName() != null) {
            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
            File file = new File(uploadDir, post.getFileName());
            if (file.exists()) file.delete();
        }

        postRepository.delete(post);
    }


}
