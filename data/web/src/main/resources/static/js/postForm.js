
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert('로그인 후 이용 가능합니다.');
        window.location.href = '/login';
        return;
    }

    // 마지막 성공 제출 시각 기록용 변수
    let lastPostTime = 0;

    // 사용자 정보 가져오기
    fetch('/api/users/me', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(user => {
            document.getElementById('authorName').textContent = user.username;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
        });

    // 폼 제출 처리
    document.getElementById('postForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // 프론트엔드에서 먼저 10초 체크
        const now = Date.now();
        if (now - lastPostTime < 10000) {
            alert('10초 이내에는 게시글을 연속으로 작성할 수 없습니다.');
            return;
        }

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const fileInput = document.getElementById('file');

        // 제목과 내용 필수 체크
        if (!title || !content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        // 확장자 검사 (jsp, exe, sh, php 등 금지)
        const forbiddenExtensions = ['jsp', 'js', 'php', 'sh', 'bat', 'exe', 'dll', 'jar', 'class', 'cmd'];
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            const extension = fileName.split('.').pop().toLowerCase();
            if (forbiddenExtensions.includes(extension)) {
                alert(`업로드할 수 없는 파일 형식입니다: .${extension}`);
                return;
            }
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        fetch('/api/posts/create-with-file', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })
            .then(async response => {
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Error response text:', errorText);
                    
                    if (response.status === 429) {
                        throw new Error(errorText || '10초 이내에는 게시글을 연속으로 작성할 수 없습니다.');
                    } else if (response.status === 500) {
                        throw new Error('서버 오류가 발생했습니다.');
                    } else {
                        throw new Error(errorText || '게시글 등록에 실패했습니다.');
                    }
                }
                return response.json();
            })
            .then(data => {
                alert('게시글이 등록되었습니다.');
                lastPostTime = Date.now(); // 성공 시점 기록
                window.location.href = '/board/posts';
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    });
});
