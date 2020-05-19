// const React = require('react');
// const { Component } = React;
import React, { Component } from 'react';

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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    reset: false,
  };

  onClickReset = () => {};

  render() {
    const { winBalls, bonus, reset } = this.state;
    return (
      <>
        <div>
          <div>Winning Number</div>
          <div id="result">
          </div>
          <div>Bonus</div>
          <button onClick={reset ? this.onClickReset : () => {}}>Reset</button>
        </div>
      </>
    );
  }
}

// module.exports = Lotto;
export default Lotto;