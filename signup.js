document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    if (!studentId || !phone || !username || !password) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    window.location.href = 'index.html'; // 로그인 페이지로 이동
});
