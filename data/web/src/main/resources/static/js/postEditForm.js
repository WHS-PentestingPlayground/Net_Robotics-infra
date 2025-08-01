
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
    }

    const postId = document.getElementById('postId').value;

    // 사용자 정보 가져오기
    fetch('/api/users/me', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(user => {
            document.getElementById('authorName').textContent = user.username;
            loadPostData(postId);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
        });
});

function loadPostData(postId) {
    const token = localStorage.getItem('jwtToken');
    fetch(`/api/posts/${postId}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(post => {
            document.getElementById('title').value = post.title;
            document.getElementById('content').value = post.content;

            if (post.fileName) {
                const currentFile = document.getElementById('currentFile');
                currentFile.textContent = `현재 파일: ${post.fileName}`;
                currentFile.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('게시글을 불러오는데 실패했습니다.');
        });
}

document.getElementById('editPostForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');
    const postId = document.getElementById('postId').value;
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('content', document.getElementById('content').value);

    const fileInput = document.getElementById('file');
    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
    }

    fetch(`/api/posts/${postId}/edit`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) return response.text().then(msg => { throw new Error(msg); });
            return response.text();
        })
        .then(() => {
            alert('게시글이 수정되었습니다.');
            window.location.href = `/board/posts/${postId}`;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('게시글 수정에 실패했습니다.\n' + error.message);
        });
});