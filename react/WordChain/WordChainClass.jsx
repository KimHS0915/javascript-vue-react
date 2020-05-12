const React = require('react');
const { Component } = React;

class WordChain extends Component {
  state = {
    word: 'word',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length-1] === this.state.value[0]) {
      this.setState({
        result: 'correct',
        word: this.state.value,
        value: '',        
      });
      this.input.focus();
    } else {
      this.setState({
        result: 'incorrect',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.currentTarget.value });
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
    <>
      <div>{this.state.word}</div>
      <br></br>
      <form onSubmit={this.onSubmitForm}>
        <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
        <button>input</button>
      </form>
      <div>{this.state.result}</div>
    </>
    );
  }
}

module.exports = WordChain;