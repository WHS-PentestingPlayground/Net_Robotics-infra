package com.whs.dev2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.whs.dev2.entity.Post;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByIdDesc();
    Optional<Post> findTopByUserIdOrderByCreatedAtDesc(Long userId);
    
    @Query(value = "SELECT COUNT(*) FROM posts WHERE user_id = :userId AND created_at >= (NOW() - INTERVAL 10 SECOND)", nativeQuery = true)
    int countRecentPostsByUserId(@Param("userId") Long userId);
}