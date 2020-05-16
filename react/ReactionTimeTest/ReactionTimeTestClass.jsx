const React = require('react');
const { PureComponent } = React;

class ReactionTimeTest extends PureComponent {
  state = {
    result: [],
    state: 'waiting',
    message: 'Click anywhere to start',
  };

  onClickScreen = () => {};

  render() {
    return (
      <>
        <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
          {this.state.message}
        </div>
        {
        this.state.result.length === 0 ? null :
        <div>Average Time : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
        }
        <button>Reset</button>
      </>
    );
  }
}

module.exports = ReactionTimeTest;