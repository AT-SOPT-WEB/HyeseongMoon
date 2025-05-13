import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSignup = async () => {
    try {
      await axios.post("https://api.sopt.org/signup", { id, pw, nickname });
      alert(`${nickname}님, 회원가입이 완료되었습니다!`);
      navigate("/");
    } catch {
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-6">
      <h1 className="text-2xl font-bold">회원가입</h1>

      {step === 1 && (
        <SignupStep1 id={id} setId={setId} setStep={setStep} />
      )}
      {step === 2 && (
        <SignupStep2
          pw={pw}
          setPw={setPw}
          pwConfirm={pwConfirm}
          setPwConfirm={setPwConfirm}
          showPw={showPw}
          setShowPw={setShowPw}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <SignupStep3
          nickname={nickname}
          setNickname={setNickname}
          handleSignup={handleSignup}
        />
      )}

      <button
        onClick={() => navigate("/")}
        className="text-sm text-blue-500 underline mt-4"
      >
        로그인 페이지로 돌아가기
      </button>
    </div>
  );
};

export default Signup;
