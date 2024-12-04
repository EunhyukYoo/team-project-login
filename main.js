// 메인 페이지에서 로그인 상태 확인
const token = localStorage.getItem("token");

if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "index.html"; // 로그인 페이지로 이동
}

// 시간표와 관심사 입력 폼 처리
document.getElementById("save-btn").addEventListener("click", () => {
    // 시간표 파일 확인
    const timetable = document.getElementById("timetable").files[0];
    if (!timetable) {
        alert("시간표 이미지를 업로드해주세요.");
        return;
    }

    // 관심사 선택 확인
    const interest = document.getElementById("interest").value;
    if (!interest) {
        alert("관심사를 선택해주세요.");
        return;
    }

    // 성적 선택 확인
    const grade = document.getElementById("grade").value;
    if (!grade) {
        alert("성적을 선택해주세요.");
        return;
    }

    // 데이터 출력 (디버깅용)
    console.log("저장된 데이터:");
    console.log("시간표:", timetable.name);
    console.log("관심사:", interest);
    console.log("성적:", grade);

    // 저장 완료 메시지
    alert("정보가 성공적으로 저장되었습니다!");
});
