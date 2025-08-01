<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>글 수정 - 화햇 로보틱스</title>
    <link rel="stylesheet" href="/css/header.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/postForm.css">
</head>
<body>
<%@ include file="header.jsp" %>

<div class="container">
    <div class="form-container">
        <h2 class="form-title">글 수정</h2>
        <form id="editPostForm" enctype="multipart/form-data">
            <input type="hidden" id="postId" value="${postId}" />

            <div class="form-group">
                <label for="title" class="form-label">제목</label>
                <input type="text" id="title" name="title" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="content" class="form-label">내용</label>
                <textarea id="content" name="content" class="form-input" required></textarea>
            </div>

            <div class="form-group">
                <label for="file" class="form-label">파일 첨부 (선택)</label>
                <input type="file" id="file" name="file" class="form-input" />
                <p id="currentFile" class="mt-1" style="display: none;"></p>
            </div>

            <div class="form-group">
                <div class="form-label">작성자: <b id="authorName"></b></div>
            </div>

            <button type="submit" class="form-button">수정 완료</button>
        </form>
    </div>
</div>

<script src="/js/postEditForm.js">
</script>
</body>
</html>
