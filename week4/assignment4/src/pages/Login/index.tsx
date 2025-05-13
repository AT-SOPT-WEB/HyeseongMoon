import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://sopt.org/login", { id, pw });
      const { userId, nickname } = res.data;
      localStorage.setItem("userId", userId);
      alert(`${nickname}님, 환영합니다!`);
      navigate("/mypage");
    } catch {
      alert("로그인 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <LoginForm
        id={id}
        setId={setId}
        pw={pw}
        setPw={setPw}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Login;
