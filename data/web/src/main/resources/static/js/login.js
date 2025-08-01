document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('errorMessage');

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                const token = response.headers.get('Authorization');
                if (token && token.startsWith('Bearer ')) {
                    localStorage.setItem('jwtToken', token.substring(7));
                    window.location.href = '/'; // 로그인 성공 후 메인 페이지로 이동
                } else {
                    errorMessageDiv.textContent = '로그인 실패: 토큰이 발급되지 않았습니다.';
                    errorMessageDiv.style.display = 'block';
                }
            } else {
                return response.json().then(errorData => {
                    let message = '로그인 중 알 수 없는 오류가 발생했습니다.';
                    if (response.status === 400 || response.status === 401) {
                        message = '로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.';
                    } else if (response.status === 404) {
                        message = '로그인 실패: 해당 아이디의 사용자를 찾을 수 없습니다.';
                    } else if (response.status >= 500) {
                        message = '서버 오류: 잠시 후 다시 시도해주세요.';
                    }
                    errorMessageDiv.textContent = message;
                    errorMessageDiv.style.display = 'block';
                }).catch(() => {
                    errorMessageDiv.textContent = '로그인 실패: 서버 응답을 처리할 수 없습니다.';
                    errorMessageDiv.style.display = 'block';
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            errorMessageDiv.textContent = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.';
            errorMessageDiv.style.display = 'block';
        });
});