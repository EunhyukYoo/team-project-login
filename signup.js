document.getElementById("signup-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // 기본 동작 방지

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
    }

    try {
        console.log("회원가입 요청 시작:", { username, password }); // 디버깅 로그

        // 서버에 요청 보내기
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        console.log("서버 응답:", data);

        if (response.ok) {
            alert("회원가입 성공! 로그인 페이지로 이동합니다.");

            // 약간의 대기 시간을 주고 리다이렉트 실행
            setTimeout(() => {
                window.location.assign("index.html");
            }, 100);
        } else {
            console.warn("회원가입 실패:", data.message);
            alert(`회원가입 실패: ${data.message}`);
        }
    } catch (error) {
        console.error("회원가입 요청 중 오류 발생:", error);
        alert("회원가입 중 문제가 발생했습니다. 나중에 다시 시도해주세요.");
    }
});
