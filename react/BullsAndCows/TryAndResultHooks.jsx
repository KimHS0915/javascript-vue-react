const React = require('react');
const { Component } = React;

const TryAndResult = (props) => {
  return (
    <li>
      <div>{props.try}, {props.result}</div>
    </li>
  )
};

module.exports = TryAndResult;