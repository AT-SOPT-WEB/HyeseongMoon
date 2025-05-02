/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const cardStyle = css`
  position: relative;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 1.5rem;
  width: 300px;
  margin: 1rem auto;
  background-color: #f9fafb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const closeBtn = css`
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const avatar = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const name = css`
  margin: 0.5rem 0;
  font-size: 1.4rem;
  color: #1f2937;
`;

const username = css`
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const bio = css`
  font-style: italic;
  margin-bottom: 1rem;
`;

function GithubCard({ data, onClose }) {
  return (
    <div css={cardStyle}>
      <button css={closeBtn} onClick={onClose}>❌</button>

      <a href={data.html_url} target="_blank" rel="noopener noreferrer">
        <img css={avatar} src={data.avatar_url} alt="avatar" />
      </a>

      <a href={data.html_url} target="_blank" rel="noopener noreferrer">
        <h2 css={name}>{data.name || '이름 없음'}</h2>
      </a>

      <p css={username}>@{data.login}</p>
      <p css={bio}>{data.bio || '자기소개 없음'}</p>
      <p>👥 팔로워: {data.followers} | 팔로잉: {data.following}</p>

      <a href={data.html_url} target="_blank" rel="noopener noreferrer">
        👉 깃허브 프로필로 이동
      </a>
    </div>
  );
}

export default GithubCard;
