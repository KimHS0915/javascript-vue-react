// const React = require('react');
// const { Component } = React;
import React, { Component } from 'react';
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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    reset: false,
  };

  timeouts = [];

  componentDidMount() {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
     setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        reset: true,
      });
    }, 7000);
  }

  onClickReset = () => {};

  render() {
    const { winBalls, bonus, reset } = this.state;
    return (
      <>
        <div>
          <div>Winning Number</div>
          <div id="result">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
          </div>
          <div>Bonus</div>
          {bonus && <Ball number={bonus} />}
          <button onClick={reset ? this.onClickReset : () => {}}>Reset</button>
        </div>
      </>
    );
  }
}

// module.exports = Lotto;
export default Lotto;