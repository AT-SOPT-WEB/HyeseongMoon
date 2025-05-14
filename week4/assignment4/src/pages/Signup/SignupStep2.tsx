import React from "react";

interface Props {
  pw: string;
  setPw: (value: string) => void;
  pwConfirm: string;
  setPwConfirm: (value: string) => void;
  showPw: boolean;
  setShowPw: (value: boolean) => void;
  setStep: (step: number) => void;
}

const SignupStep2: React.FC<Props> = ({
  pw,
  setPw,
  pwConfirm,
  setPwConfirm,
  showPw,
  setShowPw,
  setStep,
}) => {
  const isPwInvalid =
    pw.length > 20 || pwConfirm.length > 20 || pw !== pwConfirm;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md text-center">
      <input
        type={showPw ? "text" : "password"}
        placeholder="비밀번호 입력"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <input
        type={showPw ? "text" : "password"}
        placeholder="비밀번호 확인"
        value={pwConfirm}
        onChange={(e) => setPwConfirm(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        onClick={() => setShowPw(!showPw)}
        className="text-sm text-pink-500 self-end"
      >
        {showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
      </button>
      {isPwInvalid && (
        <p className="text-sm text-red-500 w-full text-left">
          비밀번호가 일치하지 않거나 20자 초과입니다.
        </p>
      )}
      <button
        onClick={() => setStep(3)}
        disabled={
          pw.length === 0 || pwConfirm.length === 0 || isPwInvalid
        }
        className={`w-full py-3 rounded-xl text-white font-semibold transition ${
          pw.length === 0 || pwConfirm.length === 0 || isPwInvalid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default SignupStep2;