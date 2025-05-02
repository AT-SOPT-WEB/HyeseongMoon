/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import GithubCard from './GithubCard';
import SearchHistory from './SearchHistory';
import Spinner from './Spinner';

const containerStyle = css`
  text-align: center;
  padding: 2rem;
`;

const inputStyle = css`
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  width: 300px;
  border: 2px solid #3b82f6;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const errorStyle = css`
  color: red;
  font-weight: bold;
  margin-top: 1rem;
`;

function GithubSearch() {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('github-history');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const getUserInfo = async (user) => {
    setUserInfo({ status: 'pending', data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUserInfo({ status: 'resolved', data });
      saveHistory(user);
    } catch {
      setUserInfo({ status: 'rejected', data: null });
    }
  };

  const saveHistory = (user) => {
    if (history.includes(user)) return;
    const updated = [...history.slice(-2), user];
    setHistory(updated);
    localStorage.setItem('github-history', JSON.stringify(updated));
  };

  const deleteHistory = (user) => {
    const updated = history.filter((h) => h !== user);
    setHistory(updated);
    localStorage.setItem('github-history', JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (username.trim()) getUserInfo(username.trim());
    setUsername('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div css={containerStyle}>
      <input
        css={inputStyle}
        type="text"
        placeholder="깃허브 아이디를 입력하세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <SearchHistory
        history={history}
        onClick={getUserInfo}
        onDelete={deleteHistory}
      />

      {userInfo.status === 'pending' && <Spinner />}

      {userInfo.status === 'rejected' && (
        <p css={errorStyle}>검색 결과를 찾을 수 없습니다.</p>
      )}

      {userInfo.status === 'resolved' && (
        <GithubCard
          data={userInfo.data}
          onClose={() => setUserInfo({ status: 'idle', data: null })}
        />
      )}
    </div>
  );
}

export default GithubSearch;