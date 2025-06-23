<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WHS Feedback - 메인</title>
    <link rel="stylesheet" href="/css/header.css" />
    <link rel="stylesheet" href="/css/index.css" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
<%@ include file="header.jsp" %>
<main class="main-content">
    <div class="hero-section">
        <h1 class="hero-title">WHS Feedback</h1>
        <p class="hero-subtitle">화햇 제품 피드백 센터에 오신 것을 환영합니다</p>

        <div class="cta-buttons">
            <a href="/board/posts" class="cta-button primary">
                <span class="button-icon">📝</span>
                게시판
            </a>
            <c:choose>
                <c:when test="${empty sessionScope.user}">
                    <a href="/login" class="cta-button secondary">
                        <span class="button-icon">🔑</span>
                        로그인
                    </a>
                    <a href="/register" class="cta-button secondary">
                        <span class="button-icon">👤</span>
                        회원가입
                    </a>
                </c:when>
                <c:otherwise>
                    <a href="/board/newPost" class="cta-button secondary">
                        <span class="button-icon">✏️</span>
                        글쓰기
                    </a>
                </c:otherwise>
            </c:choose>
        </div>
    </div>

    <div class="features-section">
        <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>제품별 피드백</h3>
            <p>제품 사용 후기를 간편하게 남겨보세요</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>투명한 반영</h3>
            <p>여러분의 소중한 의견을 확인하고 반영합니다</p>
        </div>
        <div class="feature-card">
            <div class="feature-icon">💡</div>
            <h3>카테고리별 관리</h3>
            <p>하드웨어/UX/기능을 구분해 관리합니다</p>
        </div>
    </div>
</main>
</body>
</html>
