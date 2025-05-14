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
      localStorage.setItem("nickname", nickname); // 닉네임 저장도 추가
      alert(`${nickname}님, 환영합니다!`);
      navigate("/mypage");
    } catch {
      alert("로그인 실패");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-4">
      <LoginForm
        id={id}
        setId={setId}
        pw={pw}
        setPw={setPw}
        onLogin={handleLogin}
      />
      <button
        onClick={() => navigate("/signup")}
        className="text-sm text-blue-500 underline mt-2"
      >
        아직 회원이 아니신가요? 회원가입
      </button>
    </div>
  );
};

export default Login;
