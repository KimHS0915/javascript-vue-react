const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const BullsAndCows = require('./BullsAndCowsHooks');

const Hot = hot(BullsAndCows);

ReactDom.render(<Hot />, document.querySelector('#root'));