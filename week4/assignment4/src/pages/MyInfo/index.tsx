import { useEffect, useState } from "react";

const MyInfo = () => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    setNickname(stored || "알 수 없음");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">내 정보</h1>
      <p className="text-lg">닉네임: {nickname}</p>
    </div>
  );
};

export default MyInfo;
