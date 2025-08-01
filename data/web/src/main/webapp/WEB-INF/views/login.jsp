<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 - 화햇 로보틱스</title>
    <link rel="stylesheet" href="/css/header.css">
    <link rel="stylesheet" href="/css/login.css">
</head>
<body>
    <%@ include file="header.jsp" %>
    <div class="login-section">
        <div class="login-container">
            <h2 class="form-title">로그인</h2>
            <div id="errorMessage" class="error-message" style="display:none;"></div>
            <form id="loginForm">
                <div class="form-group">
                    <label for="username" class="form-label">아이디</label>
                    <input type="text" id="username" name="username" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="password" class="form-label">비밀번호</label>
                    <input type="password" id="password" name="password" class="form-input" required>
                </div>
                <button type="submit" class="form-button">로그인</button>
            </form>
            <a href="/register" class="form-link">회원가입으로 이동</a>
        </div>
    </div>

    <script src="/js/login.js">
    </script>
</body>
</html>