package com.whs.dev2.entity;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.whs.dev2.entity.common.BaseEntity;

@Entity
@Getter
@Setter
@Table(name = "posts")
public class Post extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = true)
    private String fileName;  // 첨부 파일 이름

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = true)
    private String encryptedFileName; // 암호화된 파일명

    @Column(columnDefinition = "LONGTEXT", nullable = true)
    private String encryptedFileData; // 암호화된 파일 데이터


}

