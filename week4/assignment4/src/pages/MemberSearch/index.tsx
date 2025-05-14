import { useState } from "react";
import axios from "axios";

const MemberSearch = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const endpoint = query.trim()
        ? `https://api.sopt.org/members?nickname=${encodeURIComponent(query)}`
        : "https://api.sopt.org/members";

      const response = await axios.get(endpoint);
      setResult(response.data.members); // API 응답 구조에 따라 조정 필요
    } catch (error) {
      console.error("회원 조회 실패:", error);
      alert("회원 조회에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-bold text-center">회원 검색</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="닉네임 검색"
        className="border border-gray-300 px-4 py-2 w-full max-w-md rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <button
        onClick={handleSearch}
        className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-xl hover:bg-pink-600 transition"
      >
        검색
      </button>

      <ul className="flex flex-wrap gap-3 justify-center mt-6">
        {result.map((member, idx) => (
          <li
            key={idx}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full shadow text-sm"
          >
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberSearch;
