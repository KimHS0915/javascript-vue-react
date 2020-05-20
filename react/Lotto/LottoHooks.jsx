import React, { memo, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

const getWinNumbers = () => {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = memo(() => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [reset, setReset] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
    }, 7000);
    timeouts.current[7] = setTimeout(() => {
      setReset(true);
    }, 8000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  const onClickReset = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setReset(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>
        <div>Winning Number</div>
        <div id="result">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>Bonus</div>
        {bonus && <Ball number={bonus} />}
        {reset && <button onClick={onClickReset}>Reset</button>}
      </div>
    </>
  );
});

export default Lotto;