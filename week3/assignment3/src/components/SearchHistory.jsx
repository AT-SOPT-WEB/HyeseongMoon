/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const containerStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const itemStyle = css`
  display: flex;
  align-items: center;
  background-color: #e5e7eb;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
`;

const nameStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  color: #1f2937;
  font-weight: bold;
  margin-right: 0.4rem;

  &:hover {
    color: #2563eb;
  }
`;

const deleteStyle = css`
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  color: red;
`;

function SearchHistory({ history, onClick, onDelete }) {
  return (
    <div css={containerStyle}>
      {history.map((user) => (
        <div key={user} css={itemStyle}>
          <button css={nameStyle} onClick={() => onClick(user)}>
            {user}
          </button>
          <button css={deleteStyle} onClick={() => onDelete(user)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default SearchHistory;

