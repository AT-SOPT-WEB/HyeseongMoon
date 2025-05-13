import { useState } from "react";

const MemberSearch = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleSearch = () => {
    // 임시 로직
    setResult([`검색어 '${query}'와 관련된 유저 1`, "유저 2"]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">회원 검색</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="닉네임 검색"
        className="border px-4 py-2 w-full max-w-md rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
      >
        검색
      </button>
      <ul className="mt-4 text-left">
        {result.map((r, idx) => (
          <li key={idx} className="text-gray-700">{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberSearch;
