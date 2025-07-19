let currentPostId = null;
let currentUserId = null;

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert('로그인 후 이용 가능합니다.');
        window.location.href = '/login';
        return;
    }

    const pathParts = window.location.pathname.split('/');
    const cleanedPathParts = pathParts.filter(part => part !== '');

    if (cleanedPathParts.length > 0) {
        currentPostId = cleanedPathParts[cleanedPathParts.length - 1];
        if (isNaN(currentPostId)) {
            console.error("URL에 유효한 게시글 ID가 없습니다:", currentPostId);
            alert('잘못된 접근입니다. 게시글 ID가 필요합니다.');
            window.location.href = '/board/posts';
            return;
        }
    } else {
        console.error("URL에 게시글 ID가 없습니다. 올바른 형식: /board/posts/{id}");
        alert('잘못된 접근입니다. 게시글 ID가 필요합니다.');
        window.location.href = '/board/posts';
        return;
    }

    // 사용자 정보 가져오기 (게시글 수정/삭제 권한 확인용)
    fetch('/api/users/me', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('jwtToken');
                    alert('세션이 만료되었거나 로그인이 필요합니다.');
                    window.location.href = '/login';
                }
                throw new Error(`사용자 정보를 가져오는데 실패했습니다: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(user => {
            currentUserId = user.id;
            if (currentPostId) {
                console.log("loadPostDetail 함수 호출 직전! currentPostId:", currentPostId);
                loadPostDetail(); // 게시글 상세 정보 로드
            }
        })
        .catch(error => {
            console.error('사용자 정보 로드 오류:', error);
            alert('사용자 정보를 가져오는데 실패했습니다. 로그인이 필요할 수 있습니다.');
            window.location.href = '/login';
        });
});

function loadPostDetail() {
    const apiUrl = '/api/posts/' + currentPostId;
    console.log("loadPostDetail 함수 내부. API 호출 URL:", apiUrl);

    fetch(apiUrl)
        .then(response => {
            console.log("API 응답 수신:", response);
            if (!response.ok) {
                if (response.status === 404) {
                    alert('요청하신 게시글을 찾을 수 없습니다.');
                    window.location.href = '/board/posts';
                    return;
                }
                throw new Error('게시글을 불러오는데 실패했습니다: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(post => {
            const actualPost = Array.isArray(post) ? post[0] : post;

            if (!actualPost) {
                alert('게시글 데이터를 불러오는데 실패했습니다. 데이터가 비어있거나 올바른 형식이 아닙니다.');
                window.location.href = '/board/posts';
                return;
            }

            console.log("실제 표시할 게시글 데이터:", actualPost);

            // HTML 요소에 데이터 삽입
            document.getElementById('postTitle').textContent = actualPost.title;
            document.getElementById('postAuthor').textContent = actualPost.author; // 여기에 작성자 정보가 들어감
            document.getElementById('postDate').textContent = new Date(actualPost.createdAt).toLocaleString();
            document.getElementById('postContent').textContent = actualPost.content;

            if (actualPost.fileName) {
                const attachmentDiv = document.getElementById('postAttachment');
                const attachmentLink = document.getElementById('attachmentLink');
                attachmentLink.href = '/uploads/' + actualPost.fileName; // 실제 파일 경로로 수정
                attachmentLink.textContent = actualPost.fileName;
                attachmentDiv.style.display = 'flex'; // flex로 변경하여 아이콘과 텍스트 정렬
            } else {
                document.getElementById('postAttachment').style.display = 'none';
            }

            // 수정/삭제 버튼 표시 여부
            if (actualPost.user && actualPost.user.id === currentUserId) {
                document.getElementById('postActions').style.display = 'flex'; // flex로 변경
            } else {
                document.getElementById('postActions').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('게시글 로드 오류:', error);
            alert('게시글을 불러오는데 실패했습니다.');
            window.location.href = '/board/posts'; // 오류 시 목록으로 이동
        });
}

function editPost() {
    window.location.href = '/board/editPost?id=' + currentPostId; // 문자열 연결 사용
}

function deletePost() {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        return;
    }

    const token = localStorage.getItem('jwtToken');
    fetch('/api/posts/' + currentPostId, { // 문자열 연결 사용
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 403) { alert('게시글을 삭제할 권한이 없습니다.'); }
                else if (response.status === 404) { alert('삭제할 게시글을 찾을 수 없습니다.'); }
                else if (response.status === 401) {
                    localStorage.removeItem('jwtToken');
                    alert('세션이 만료되어 삭제할 수 없습니다. 다시 로그인해주세요.');
                    window.location.href = '/login';
                }
                throw new Error('게시글 삭제 실패: ' + response.status + ' ' + response.statusText);
            }
            alert('게시글이 삭제되었습니다.');
            window.location.href = '/board/posts';
        })
        .catch(error => {
            console.error('게시글 삭제 오류:', error);
            alert('게시글 삭제에 실패했습니다.');
        });
}