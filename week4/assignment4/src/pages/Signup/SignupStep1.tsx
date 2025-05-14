interface Props {
  id: string;
  setId: (value: string) => void;
  setStep: (step: number) => void;
}

const SignupStep1 = ({ id, setId, setStep }: Props) => {
  const isIdInvalid = id.length > 20;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <input
        type="text"
        placeholder="아이디 입력 (20자 이내)"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      {isIdInvalid && (
        <p className="text-sm text-red-500 w-full text-left">
          아이디는 20자 이하여야 합니다.
        </p>
      )}
      <button
        onClick={() => setStep(2)}
        disabled={id.length === 0 || isIdInvalid}
        className={`w-full py-2 rounded-xl text-white font-semibold transition ${
          id.length === 0 || isIdInvalid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default SignupStep1;
