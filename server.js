const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware 설정
app.use(cors());
app.use(bodyParser.json());

// SQLite 데이터베이스 연결
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("데이터베이스 연결 실패:", err.message);
    } else {
        console.log("SQLite 데이터베이스에 연결되었습니다.");
    }
});

// 회원 테이블 생성
db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`
);

// 회원가입 API
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (username, password) VALUES (?, ?)`,
            [username, hashedPassword],
            function (err) {
                if (err) {
                    if (err.code === "SQLITE_CONSTRAINT") {
                        console.error("중복된 아이디:", username);
                        return res.status(400).json({ message: "아이디가 이미 존재합니다." });
                    }
                    console.error("회원가입 실패:", err.message);
                    return res.status(500).json({ message: "회원가입 실패", error: err.message });
                }

                console.log("회원가입 성공:", username);
                res.status(201).json({ message: "회원가입 성공" }); // 즉시 응답
            }
        );
    } catch (error) {
        console.error("회원가입 중 오류 발생:", error);
        res.status(500).json({ message: "회원가입 실패", error: error.message });
    }
});


// 로그인 API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: "로그인 실패", error: err.message });
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
        }

        // JWT 토큰 생성
        const token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });
        res.status(200).json({ message: "로그인 성공", token });
    });
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
