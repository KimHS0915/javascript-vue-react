const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const ReactionTimeTest = require('./ReactionTimeTestHooks');

const Hot = hot(ReactionTimeTest);

ReactDom.render(<Hot />, document.querySelector('#root'));