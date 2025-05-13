import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://sopt.org/login", {
        id,
        pw,
      });

      const { userId, nickname } = res.data;
      localStorage.setItem("userId", userId);
      localStorage.setItem("nickname", nickname);
      navigate("/mypage");
    } catch (err) {
      alert("로그인 실패: 아이디와 비밀번호를 확인해주세요.");
    }
  };

  const isDisabled = id.trim() === "" || pw.trim() === "";

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">로그인</h1>

      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border px-4 py-2 w-64 rounded"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="border px-4 py-2 w-64 rounded"
      />

      <button
        disabled={isDisabled}
        onClick={handleLogin}
        className={`w-64 py-2 rounded text-white ${
          isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        로그인
      </button>

      <Link to="/signup" className="text-sm text-blue-500 hover:underline">
        회원가입 하러 가기 →
      </Link>
    </div>
  );
};

export default Login;
