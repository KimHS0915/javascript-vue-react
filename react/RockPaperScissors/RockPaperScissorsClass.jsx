const React = require('react');
const { Component } = React;

class RockPaperScissors extends Component {
  state = {};

  render() {
    return (
      <>
        <div id="computer"></div>
        <div>
          <button>Rock</button>
          <button>Paper</button>
          <button>Scissors</button>
        </div>
      </>
    );
  }
}

module.exports = RockPaperScissors;