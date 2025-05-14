import { useEffect, useState } from "react";

const MyInfo = () => {
  const [nickname, setNickname] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    setNickname(storedNickname || "알 수 없음");
    setInputValue(storedNickname || "");
  }, []);

  const handleSave = () => {
    if (!inputValue.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    localStorage.setItem("nickname", inputValue);
    setNickname(inputValue);
    alert("닉네임이 저장되었습니다!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold text-center">내 정보</h1>

      <p className="text-xl text-gray-700">
        현재 닉네임: <span className="font-semibold">{nickname}</span>
      </p>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="새 닉네임 입력"
        className="border px-4 py-2 rounded w-full max-w-xs"
      />

      <button
        onClick={handleSave}
        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
      >
        저장
      </button>
    </div>
  );
};

export default MyInfo;
