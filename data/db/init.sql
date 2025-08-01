-- data/db/init.sql

-- 데이터베이스 생성 및 사용
CREATE DATABASE IF NOT EXISTS net_robotics CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE net_robotics;

-- 사용자 생성 및 권한 부여
CREATE USER IF NOT EXISTS 'whs3'@'%' IDENTIFIED BY 'whs3password123!';
GRANT ALL PRIVILEGES ON net_robotics.* TO 'whs3'@'%';
FLUSH PRIVILEGES;

-- 사용자 테이블
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 게시글 테이블
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    file_name VARCHAR(255),
    encrypted_file_name VARCHAR(255),
    encrypted_file_data LONGTEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

DELIMITER $$

CREATE TRIGGER prevent_rapid_post_insert
BEFORE INSERT ON posts
FOR EACH ROW
BEGIN
    IF (
        SELECT COUNT(*) FROM posts
        WHERE user_id = NEW.user_id
          AND created_at >= (NOW() - INTERVAL 5 SECOND)
    ) > 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'You can only create a post every 10 seconds.';  
    END IF;
END$$

DELIMITER ;

-- 플래그 테이블
CREATE TABLE flag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    encrypted_file_data LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO flag (file_name, encrypted_file_data)
VALUES ('aes_encrypted.enc', '2TR5h3r59yBCSYadbmyyLbZ7yODksawpAS3KAyWfQ5gsLBmu024QhMaSEnn1JUKk6k7NFr01TbKI6SlE8l5jqw=='
);
