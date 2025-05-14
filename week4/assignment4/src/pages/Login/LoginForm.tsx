interface Props {
  id: string;
  setId: (v: string) => void;
  pw: string;
  setPw: (v: string) => void;
  onLogin: () => void;
}

const LoginForm = ({ id, setId, pw, setPw, onLogin }: Props) => {
  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center mb-4">로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onLogin}
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
      >
        로그인
      </button>
    </div>
  );
};

export default LoginForm;
