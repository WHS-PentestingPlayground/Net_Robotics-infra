<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error ${statusCode} - Net Robotics</title>
    <link rel="stylesheet" href="/css/error.css">
</head>
<body>
    <div class="error-container">
        <div class="error-code">${statusCode}</div>
        <div class="error-message">${errorMessage}</div>
        <div class="buttons">
            <a href="/" class="btn">홈으로 돌아가기</a>
            <a href="javascript:history.back()" class="btn btn-secondary">이전 페이지</a>
        </div>
    </div>
</body>
</html> 