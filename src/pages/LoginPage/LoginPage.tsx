import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Если токен есть, сразу отправляем на главную страницу
            navigate('/');
        }
    }, [navigate]);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // <-- Добавлено async
        e.preventDefault()

        try {
            const response = await fetch("http://127.0.0.1:8080/api/login", { // <-- Добавлено await
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            // Ждем превращения ответа в JSON объект
            const data = await response.json()

            // Выводим результат работы в консоль браузера
            console.log("Успешный ответ сервера:", data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', data.user.email);

        } catch (error) {
            console.error("Сетевая ошибка:", error)
        }
    }


    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage