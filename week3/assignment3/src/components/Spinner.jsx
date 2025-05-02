/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const spinnerStyle = css`
  margin: 1rem auto;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function Spinner() {
  return <div css={spinnerStyle}></div>;
}

export default Spinner;
