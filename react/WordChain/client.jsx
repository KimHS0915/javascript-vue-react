const React = require('react');
const ReactDom = require('react-dom');

// const WordChain = require('./WordChainClass');
const WordChain = require('./WordChainHooks');

ReactDom.render(<WordChain />, document.querySelector('#root'));