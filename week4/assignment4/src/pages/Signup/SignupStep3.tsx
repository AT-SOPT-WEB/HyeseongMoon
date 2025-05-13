interface Props {
  nickname: string;
  setNickname: (v: string) => void;
  handleSignup: () => void;
}

const SignupStep3 = ({ nickname, setNickname, handleSignup }: Props) => {
  const isNicknameInvalid = nickname.trim().length === 0;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <input
        type="text"
        placeholder="닉네임 입력"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSignup}
        disabled={isNicknameInvalid}
        className={`w-full py-2 rounded-md text-white font-semibold transition ${
          isNicknameInvalid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignupStep3;
