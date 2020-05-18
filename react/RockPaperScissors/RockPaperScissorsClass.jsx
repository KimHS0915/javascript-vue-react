const React = require('react');
const { Component } = React;

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

class RockPaperScissors extends Component {
  state = {
    imgCoord: coords.paper,
    result: '',
    win: 0,
    draw: 0,
    lose: 0,
  };

  interval;

  componentDidMount() {
    this.interval = setInterval(this.repeatRockPaperScissors, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  repeatRockPaperScissors = () => {
    const {imgCoord} = this.state;
    if (imgCoord === coords.rock) {
      this.setState({
        imgCoord: coords.paper,
      });
    } else if (imgCoord === coords.paper) {
      this.setState({
        imgCoord: coords.scissors,
      });
    } else if (imgCoord === coords.scissors) {
      this.setState({
        imgCoord: coords.rock,
      });
    }
  };

  onClickButton = (choice) => () => {
    clearInterval(this.interval);
    const { imgCoord } = this.state;
    const score = scoreBoard[choice] - scoreBoard[comChoice(imgCoord)];
    if (score === 0) {
      this.setState((prevState) => {
        return {
          result: 'Draw',
          draw: prevState.draw + 1,
        };
      });
    } else if ([-2, 1].includes(score)) {
      this.setState((prevState) => {
        return {
          result: 'You Win',
          win: prevState.win + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: 'You Lose',
          lose: prevState.lose + 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.repeatRockPaperScissors, 100);
    }, 1000);
  };

  render() {
    const { result, win, draw, lose, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(img/rockPaperScissors.jpg) ${imgCoord} 0` }}></div>
        <div>
          <button id="rock" onClick={this.onClickButton('rock')}>Rock</button>
          <button id="paper" onClick={this.onClickButton('paper')}>Paper</button>
          <button id="scissors" onClick={this.onClickButton('scissors')}>Scissors</button>
        </div>
        <div>{result}</div>
        <div>Win : { win }, Draw : { draw }, Lose : { lose }</div>
      </>
    );
  }
}

module.exports = RockPaperScissors;