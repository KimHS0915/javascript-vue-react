const React = require('react');
const { PureComponent, createRef } = React;
const TryAndResult = require('./TryAndResultClass');

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const reset = () => {
  return {
    value: '',
    answer: getNumbers(),
    tries: [],
  }
};

class BullsAndCows extends PureComponent {
  state = {
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    const { value, answer, tries } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      alert(`Answer is ${answer.join('')}, You Win!`);
      this.setState(reset);
      this.inputRef.current.focus();
    } else if (tries.length >= 9) {
      alert(`You Lose!, Answer is ${answer.join('')}`);
      this.setState(reset);
      this.inputRef.current.focus();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let bulls = 0;
      let cows = 0;
      for (let i = 0; i < 4; i++) {
        if (answerArray[i] === answer[i]) {
          bulls++;
        } else if (answer.includes(answerArray[i])) {
          cows++;
        }
      }
      this.setState((prevState) => {
        return {
          tries: [...prevState.tries, {try: value, result: `bulls : ${bulls}, cows : ${cows}`}], value: '',
        };
      });
      this.inputRef.current.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef();

  render() {
    const { value, tries } = this.state;
    let tryOrTries;

    if (tries.length > 1) {
      tryOrTries = 'Tries';
    } else {
      tryOrTries = 'Try';
    }
    
    return (
      <>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
          <button type="submit">input</button>
        </form>
        <div>{tryOrTries} : {tries.length} / 10</div>
        <ul>
          {tries.map((t, idx) => {
            return (
              <TryAndResult key={idx} try={t.try} result={t.result} />
            );
          })}
        </ul>
      </>
    );
  }
}

module.exports = BullsAndCows;