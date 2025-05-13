import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = (): JSX.Element => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // 입력 상태
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPw, setShowPw] = useState(false);

  // 유효성
  const isIdInvalid = id.length > 20;
  const isPwInvalid = pw.length > 20 || pwConfirm.length > 20 || pw !== pwConfirm;
  const isNicknameInvalid = nickname.length === 0;

  const handleSignup = async () => {
    try {
      await axios.post("https://api.sopt.org/signup", {
        id,
        pw,
        nickname,
      });
      alert(`${nickname}님, 회원가입이 완료되었습니다!`);
      navigate("/");
    } catch (err) {
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">회원가입</h1>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="아이디 입력 (20자 이내)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border px-4 py-2 w-64 rounded"
          />
          {isIdInvalid && <p className="text-red-500 text-sm">아이디는 20자 이하여야 합니다.</p>}

          <button
            onClick={() => setStep(2)}
            disabled={id.length === 0 || isIdInvalid}
            className={`w-64 py-2 rounded text-white ${
              id.length === 0 || isIdInvalid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            다음
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type={showPw ? "text" : "password"}
            placeholder="비밀번호 입력"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="border px-4 py-2 w-64 rounded"
          />
          <input
            type={showPw ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
            className="border px-4 py-2 w-64 rounded"
          />
          <button onClick={() => setShowPw((prev) => !prev)} className="text-sm text-blue-500">
            {showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
          </button>
          {isPwInvalid && <p className="text-red-500 text-sm">비밀번호가 일치하지 않거나 20자 초과입니다.</p>}

          <button
            onClick={() => setStep(3)}
            disabled={pw.length === 0 || pwConfirm.length === 0 || isPwInvalid}
            className={`w-64 py-2 rounded text-white ${
              pw.length === 0 || pwConfirm.length === 0 || isPwInvalid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            다음
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border px-4 py-2 w-64 rounded"
          />
          <button
            onClick={handleSignup}
            disabled={isNicknameInvalid}
            className={`w-64 py-2 rounded text-white ${
              isNicknameInvalid ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            회원가입
          </button>
        </>
      )}

      <button onClick={() => navigate("/")} className="text-sm text-blue-500 underline">
        로그인 페이지로 돌아가기
      </button>
    </div>
  );
};

export default Signup;
