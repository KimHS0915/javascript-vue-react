const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const RockPaperScissors = require('./RockPaperScissorsClass');

const Hot = hot(RockPaperScissors);

ReactDom.render(<Hot />, document.querySelector('#root'));