import express from "express";
import cors from "cors";

const app = express();

// 1. Поставьте CORS самым первым middleware
// 2. Используйте звездочку для тестов разработки
app.use(cors({
    // Разрешаем запросы и с localhost, и с IP-адреса
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    res.json({
        token: "fake-jwt-token",
        user: { email },
    });
});

// Перезапустите сервер после этого изменения
app.listen(8080, "0.0.0.0", () => {
    console.log("Server started on port 8080");
});