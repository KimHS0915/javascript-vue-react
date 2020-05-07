const React = require('react');
const { Component } = React;

class WordChain extends Component {
  state = {
    text: 'Word Chain',
  };

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

module.exports = WordChain;