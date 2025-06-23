<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시글 상세 - 화햇 로보틱스</title>
    <link rel="stylesheet" href="/css/header.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/postDetail.css"> </head>
<body>
<%@ include file="header.jsp" %>

<div class="container">
    <div class="post-detail-container">
        <div class="post-detail-header">
            <h2 id="postTitle" class="post-detail-title"></h2> <div class="post-detail-meta">
            <span id="postAuthor" class="post-detail-author"></span> <span id="postDate" class="post-detail-date"></span> <span id="postViews" class="post-detail-views"></span> </div>
        </div>

        <div id="postContent" class="post-detail-content"></div>

        <div id="postAttachment" class="post-detail-file" style="display: none;">
            <a id="attachmentLink" href="#" target="_blank"></a>
        </div>

        <div id="postActions" class="post-detail-actions" style="display: none;">
            <button type="button" class="edit-btn" onclick="editPost()">수정</button>
            <button type="button" class="delete-btn" onclick="deletePost()">삭제</button>
            <a href="/board/posts" class="list-btn">목록으로</a>
        </div>
    </div>
</div>

<script src="/js/postDetail.js">
</script>
</body>
</html>
