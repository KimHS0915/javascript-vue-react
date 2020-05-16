const React = require('react');
const { PureComponent } = React;

class ReactionTimeTest extends PureComponent {
  state = {
    result: [],
    state: 'waiting',
    message: 'Click anywhere to start',
  };

  timeOut;
  startTime;
  endTime;

  onClickScreen = () => {
    const { result, state, message } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: 'Wait for green',
      });
      this.timeOut = setTimeout(() => {
        this.setState({
          state: 'now',
          message: 'Click!',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(this.timeOut);
      this.setState({
        state: 'waiting',
        message: 'Too soon! Click to try again',
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          result: [...prevState.result, this.endTime - this.startTime],
          state: 'waiting',
          message: 'Click anywhere to start',
        };
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return (
      result.length === 0 ? null :
      <div>Average Time : {result.reduce((a, c) => a + c) / result.length}ms</div>
    );
  };

  onReset = () => {
    const { result } = this.state;
    this.setState({
      result: [],
    });
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        <button onClick={this.onReset}>Reset</button>
        {this.renderAverage()}
      </>
    );
  }
}

module.exports = ReactionTimeTest;