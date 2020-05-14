const React = require('react');
const { Component } = React;

class TryAndResult extends Component {
  render() {
    return (
      <li>
        <div>{this.props.try}, {this.props.result}</div>
      </li>
    );
  }
}

module.exports = TryAndResult;