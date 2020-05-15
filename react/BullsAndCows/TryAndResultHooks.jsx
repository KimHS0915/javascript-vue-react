const React = require('react');
const { memo } = React;

const TryAndResult = memo((props) => {
  return (
    <li>
      <div>{props.try}, {props.result}</div>
    </li>
  )
});

module.exports = TryAndResult;