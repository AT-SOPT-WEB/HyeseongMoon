import { useState } from "react";
import axios from "axios";

interface Member {
  id: string;
  nickname: string;
}

const MemberSearch = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Member[]>([]);

  const handleSearch = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }

      const res = await axios.get("https://api.sopt.org/users", {
        params: query.trim() ? { nickname: query } : {},
      });

      setResults(res.data.users);
    } catch (err) {
      alert("회원 검색에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4">
      <h1 className="text-xl font-bold mb-6">회원 조회</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="닉네임 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          확인
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        {results.map((user) => (
          <div
            key={user.id}
            className="border rounded px-4 py-2 shadow-sm bg-white"
          >
            <p className="font-medium">닉네임: {user.nickname}</p>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberSearch;

