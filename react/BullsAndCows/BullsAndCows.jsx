const React = require('react');
const { Component } = React;

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

class BullsAndCows extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
    tryOrTries: 'Try',
  };

  onSubmitForm = () => {};

  onChangeInput = () => {};

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>{this.state.tryOrTries} : {this.state.tries.length}</div>
      </>
    );
  }
}

module.exports = BullsAndCows;