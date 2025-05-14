import React from "react";

interface Props {
  nickname: string;
  setNickname: (value: string) => void;
  handleSignup: () => void;
}

const SignupStep3: React.FC<Props> = ({ nickname, setNickname, handleSignup }) => {
  const isNicknameInvalid = nickname.trim().length === 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md text-center">
      <input
        type="text"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        onClick={handleSignup}
        disabled={isNicknameInvalid}
        className={`w-full py-3 rounded-xl text-white font-semibold transition ${
          isNicknameInvalid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignupStep3;
