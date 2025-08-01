document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const errorMessageDiv = document.getElementById('errorMessage');

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessageDiv.textContent = '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.';
        errorMessageDiv.style.display = 'block';
        return;
    }

    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    })
        .then(response => {
            if (response.ok) {
                alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
                window.location.href = '/login';
            } else {
                return response.json().then(errorData => {
                    let message = '회원가입 중 알 수 없는 오류가 발생했습니다.';
                    if (response.status === 400) {
                        if (errorData.message) {
                            message = `회원가입 실패: ${errorData.message}`;
                        } else {
                            message = '회원가입 실패: 입력 값을 확인하세요.';
                        }
                    } else if (response.status === 409) {
                        message = '회원가입 실패: 이미 존재하는 사용자명입니다.';
                    } else if (response.status >= 500) {
                        message = '서버 오류: 잠시 후 다시 시도해주세요.';
                    }
                    errorMessageDiv.textContent = message;
                    errorMessageDiv.style.display = 'block';
                }).catch(() => {
                    errorMessageDiv.textContent = '회원가입 실패: 서버 응답을 처리할 수 없습니다.';
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