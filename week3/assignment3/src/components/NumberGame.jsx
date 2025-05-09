/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { handleKeyDownEnter } from '../utils/event'; // 재사용 함수 사용

const MAX_TRIES = 10;
const ANSWER_LENGTH = 3;

const containerStyle = css`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const inputGroupStyle = css`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const inputStyle = css`
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  border: 2px solid #ec4899;
  border-radius: 10px;
  width: 280px;

  &:focus {
    outline: none;
    border-color: #db2777;
  }
`;

const buttonStyle = css`
  background-color: #ec4899;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #db2777;
  }
`;

const messageStyle = css`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1.125rem;
  color: #831843;
`;

const listStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const itemStyle = css`
  border: 1px solid #ec4899;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: 280px;
  text-align: center;
`;

function NumberGame() {
  const [answer, setAnswer] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewAnswer = () => {
    const digits = [];
    while (digits.length < ANSWER_LENGTH) {
      const rand = Math.floor(Math.random() * 10);
      if (!digits.includes(rand)) digits.push(rand);
    }
    setAnswer(digits);
  };

  const resetGameState = () => {
    setInput('');
    setMessage('');
    setHistory([]);
    setTries(0);
  };

  const generateNewGame = () => {
    generateNewAnswer();
    resetGameState();
  };

  const isValidInput = (value) =>
    /^\d{3}$/.test(value) && new Set(value).size === ANSWER_LENGTH;

  const getResultMessage = (inputDigits) => {
    let strike = 0, ball = 0;

    inputDigits.forEach((digit, i) => {
      if (digit === answer[i]) strike++;
      else if (answer.includes(digit)) ball++;
    });

    return { strike, ball, message: `${strike} 스트라이크 ${ball} 볼` };
  };

  const handleSubmit = () => {
    if (!isValidInput(input)) {
      setMessage('❌ 0~9까지 서로 다른 숫자 3자리를 입력하세요!');
      return;
    }

    const inputDigits = input.split('').map(Number);
    const { strike, ball, message: resultMsg } = getResultMessage(inputDigits);

    setHistory((prev) => [...prev, `${input} - ${resultMsg}`]);
    const nextTry = tries + 1;
    setTries(nextTry);

    if (strike === ANSWER_LENGTH) {
      setMessage('🎉 정답입니다! 3초 후 새 게임을 시작합니다.');
      setTimeout(generateNewGame, 3000);
    } else if (nextTry >= MAX_TRIES) {
      setMessage('💥 10회 실패! 5초 후 새 게임을 시작합니다.');
      setTimeout(generateNewGame, 5000);
    } else {
      setMessage(resultMsg);
    }

    setInput('');
  };

  return (
    <div css={containerStyle}>
      <div css={inputGroupStyle}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="3자리 숫자를 입력해주세요."
          maxLength={3}
          onKeyDown={(e) => handleKeyDownEnter(e, handleSubmit)}
          css={inputStyle}
        />
        <button onClick={handleSubmit} css={buttonStyle}>
          제출
        </button>
      </div>

      <div css={messageStyle}>{message}</div>

      <div css={listStyle}>
        {history.map((item, idx) => (
          <div key={idx} css={itemStyle}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default NumberGame;

