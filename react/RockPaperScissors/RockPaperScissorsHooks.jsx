const React = require('react');
const { useState, useRef, useEffect } = React;

const coords = {
  rock: '0',
  paper: '-284px',
  scissors: '-142px',
};

const scoreBoard = {
  rock: 1,
  paper: 2,
  scissors: 3
};

const comChoice = (imgCoord) => {
  return Object.entries(coords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RockPaperScissors = () => {
  const [imgCoord, setImgCoord] = useState(coords.paper);
  const [result, setResult] = useState('');
  const [win, setWin] = useState(0);
  const [draw, setDraw] = useState(0);
  const [lose, setLose] = useState(0);
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(repeatRockPaperScissors, 100);
    return () => {
      clearInterval(interval.current);
    }
  }, [imgCoord]);

  const repeatRockPaperScissors = () => {
    if (imgCoord === coords.rock) {
      setImgCoord(coords.paper);
    } else if (imgCoord === coords.paper) {
      setImgCoord(coords.scissors);
    } else if (imgCoord === coords.scissors) {
      setImgCoord(coords.rock);
    }
  };

  const onClickButton = (choice) => () => {
    clearInterval(interval.current);
    const score = scoreBoard[choice] - scoreBoard[comChoice(imgCoord)];
    if (score === 0) {
      setResult('Draw');
      setDraw((prevDraw) => prevDraw + 1);
    } else if ([-2, 1].includes(score)) {
      setResult('You Win');
      setWin((prevWin) => prevWin + 1);
    } else {
      setResult('You Lose');
      setLose((prevLose) => prevLose + 1);
    }
    setTimeout(() => {
      interval.current = setInterval(repeatRockPaperScissors, 100);
    }, 1000);
  };

  return (
  <>
    <div id="computer" style={{ background: `url(img/rockPaperScissors.jpg) ${imgCoord} 0` }}></div>
    <div>
      <button id="rock" onClick={onClickButton('rock')}>Rock</button>
      <button id="paper" onClick={onClickButton('paper')}>Paper</button>
      <button id="scissors" onClick={onClickButton('scissors')}>Scissors</button>
    </div>
    <div>{result}</div>
    <div>Win : { win }, Draw : { draw }, Lose : { lose }</div>
  </>
  );
};

module.exports = RockPaperScissors;