<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시판 - 화햇 로보틱스</title>
    <link rel="stylesheet" href="/css/header.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/postList.css"> </head>
<body>
<%@ include file="header.jsp" %>

<div class="container">
    <div class="board-container">
        <div class="board-header">
            <h2 class="board-title">게시판</h2>
            <div class="post-list-count">전체 <span id="totalCount">0</span>개</div> <a href="/board/newPost" class="new-post-btn">새 글 작성</a>
        </div>

        <div class="post-list">
            <table>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody id="postListBody">
                </tbody>
            </table>
        </div>

        <div class="empty-message" id="emptyMessage" style="display: none;">
            아직 게시글이 없습니다. 첫 번째 글을 작성해 보세요!
        </div>
    </div>
</div>

<script src="/js/postList.js">
</script>
</body>
</html>