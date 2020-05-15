const React = require('react');
const { PureComponent } = React;

class TryAndResult extends PureComponent {
  render() {
    return (
      <li>
        <div>{this.props.try}, {this.props.result}</div>
      </li>
    );
  }
}

module.exports = TryAndResult;