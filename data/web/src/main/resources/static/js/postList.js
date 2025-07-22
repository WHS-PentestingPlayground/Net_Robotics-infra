document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
    }
    loadPosts();
});

function loadPosts() {
    const token = localStorage.getItem('jwtToken');
    const apiUrl = '/api/posts';

    console.log("게시글 목록 API 호출 URL:", apiUrl);

    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            console.log('API 응답 수신:', response);
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('jwtToken');
                    alert('인증이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.');
                    window.location.href = '/login';
                }
                throw new Error('게시글을 불러오는데 실패했습니다: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            console.log('서버로부터 받은 게시글 데이터:', posts);

            const tbody = document.getElementById('postListBody');
            const totalCountElement = document.getElementById('totalCount'); // 전체 개수 엘리먼트
            const emptyMessage = document.getElementById('emptyMessage');

            if (!Array.isArray(posts)) {
                console.error('서버 응답이 배열이 아닙니다:', posts);
                alert('잘못된 게시글 데이터 형식입니다.');
                tbody.innerHTML = '<tr><td colspan="4">게시글을 불러올 수 없습니다.</td></tr>';
                totalCountElement.textContent = 0;
                emptyMessage.style.display = 'none'; // 오류 시 빈 메시지는 숨김
                return;
            }

            totalCountElement.textContent = posts.length; // 전체 개수 업데이트

            if (posts.length === 0) {
                tbody.innerHTML = ''; // 테이블 내용 비움
                emptyMessage.style.display = 'block'; // 빈 메시지 표시
                return;
            } else {
                emptyMessage.style.display = 'none'; // 게시글이 있으면 빈 메시지 숨김
            }

            tbody.innerHTML = ''; // 기존 내용 초기화

            posts.forEach((post, index) => {
                const createdAt = new Date(post.createdAt).toLocaleDateString('ko-KR');
                const postNumber = posts.length - index;

                const tr = document.createElement('tr');

                // 번호
                const tdNum = document.createElement('td');
                tdNum.textContent = postNumber;
                tdNum.setAttribute('data-label', '번호');
                tr.appendChild(tdNum);

                // 제목
                const tdTitle = document.createElement('td');
                tdTitle.setAttribute('data-label', '제목');
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'post-title-link';
                a.dataset.postId = post.id;
                a.dataset.postAuthor = post.author || '알 수 없음';
                a.textContent = post.title;
                if (post.hasAttachment) {
                    const icon = document.createElement('span');
                    icon.className = 'file-icon';
                    icon.textContent = '📎';
                    a.appendChild(icon);
                }
                tdTitle.appendChild(a);
                tr.appendChild(tdTitle);

                // 작성자
                const tdAuthor = document.createElement('td');
                tdAuthor.setAttribute('data-label', '작성자');
                tdAuthor.textContent = post.author || '알 수 없음';
                tr.appendChild(tdAuthor);

                // 작성일
                const tdDate = document.createElement('td');
                tdDate.setAttribute('data-label', '작성일');
                tdDate.textContent = createdAt;
                tr.appendChild(tdDate);

                tbody.appendChild(tr);
            });

            // 게시글 링크 클릭 이벤트 리스너 추가
            document.querySelectorAll('.post-title-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const postId = this.getAttribute('data-post-id');
                    const postAuthor = this.getAttribute('data-post-author');

                    // 현재 로그인한 사용자 정보 가져오기
                    fetch('/api/users/me', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('사용자 정보를 가져올 수 없습니다.');
                            }
                            return response.json();
                        })
                        .then(user => {
                            // 게시글 작성자와 현재 사용자 비교
                            if (user.username === postAuthor) {
                                // 본인이 작성한 글인 경우 상세 페이지로 이동
                                window.location.href = '/board/posts/' + postId;
                            } else {
                                // 다른 사람이 작성한 글인 경우 경고 메시지
                                alert('본인이 작성한 게시글만 읽을 수 있습니다.');
                            }
                        })
                        .catch(error => {
                            console.error('사용자 정보 확인 오류:', error);
                            alert('사용자 정보를 확인할 수 없습니다. 다시 로그인해주세요.');
                            window.location.href = '/login';
                        });
                });
            });
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            alert('게시글을 불러오는데 실패했습니다.');
            document.getElementById('postListBody').innerHTML = '<tr><td colspan="4">게시글을 불러오는 중 오류가 발생했습니다.</td></tr>';
            document.getElementById('totalCount').textContent = 0;
            document.getElementById('emptyMessage').style.display = 'none'; // 오류 시 빈 메시지는 숨김
        });
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}