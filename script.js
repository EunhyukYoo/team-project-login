document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("로그인 성공!");
        localStorage.setItem("token", data.token);
        window.location.href = "main.html";
    } else {
        alert(`로그인 실패: ${data.message}`);
    }
});
