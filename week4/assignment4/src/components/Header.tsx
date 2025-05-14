import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    setNickname(storedNickname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">SOPT</div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/mypage" className="hover:text-blue-500">
          내 정보
        </Link>
        <Link to="/search" className="hover:text-blue-500">
          회원 조회
        </Link>
        <button onClick={handleLogout} className="hover:text-red-500">
          로그아웃
        </button>
        {nickname && <span className="text-gray-500">👤 {nickname}</span>}
      </nav>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-xl"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col items-center gap-4 py-4 animate-slideDown">
          <Link to="/mypage" onClick={() => setIsMobileMenuOpen(false)}>
            내 정보
          </Link>
          <Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>
            회원 조회
          </Link>
          <button onClick={handleLogout}>로그아웃</button>
          {nickname && <span className="text-gray-500">👤 {nickname}</span>}
        </div>
      )}
    </header>
  );
};

export default Header;

