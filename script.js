document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userType = document.getElementById('user-type').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
    }

    // 예: 사용자 유형에 따라 로그인 처리 로직
    alert(`${userType === 'student' ? '학생용' : '교수용'} 시스템에 로그인 중...`);
});
