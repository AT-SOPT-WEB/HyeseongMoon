/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const headerStyle = css`
  background-color:rgb(186, 67, 115);
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const tabContainer = css`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const tabStyle = css`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background-color: #ec4899; 
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #db2777;
  }
`;

function Header({ activeTab, setActiveTab }) {
  return (
    <>
      <header css={headerStyle}>⚔️깃허브 검색 & 숫자 야구⚔️</header>
      <div css={tabContainer}>
        <button css={tabStyle} onClick={() => setActiveTab('github')}>
          🔍깃허브 검색
        </button>
        <button css={tabStyle} onClick={() => setActiveTab('number')}>
          ⚾숫자 야구 게임
        </button>
      </div>
    </>
  );
}

export default Header;
