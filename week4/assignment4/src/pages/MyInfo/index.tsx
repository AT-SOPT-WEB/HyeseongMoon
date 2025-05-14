import { useEffect, useState } from "react";

const MyInfo = () => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    setNickname(storedNickname || "알 수 없음");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold text-center">내 정보</h1>
      <p className="text-xl text-gray-700">
        닉네임: <span className="font-semibold">{nickname}</span>
      </p>
    </div>
  );
};

export default MyInfo;
