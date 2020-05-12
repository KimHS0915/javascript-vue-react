const React = require('react');
const { Component, createRef } = React;

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

class BullsAndCows extends Component {
  state = {
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      alert(`Answer is ${this.state.answer.join('')}, You Win!`)
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else if (this.state.tries.length >= 9) {
      alert(`You Lose!, Answer is ${this.state.answer.join('')}`);
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],          
      });
      this.inputRef.current.focus();
    } else {
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let bulls = 0;
      let cows = 0;
      for (let i = 0; i < 4; i++) {
        if (answerArray[i] === this.state.answer[i]) {
          bulls++;
        } else if (this.state.answer.includes(answerArray[i])) {
          cows++;
        }
      }
      this.setState((prevState) => {
        return {
          tries: [...prevState.tries, {try: this.state.value, result: `bulls : ${bulls}, cows : ${cows}`}], value: '',
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
    const triesLen = tries.length;
    let tryOrTries;

    if (triesLen > 1) {
      tryOrTries = 'Tries'
    } else {
      tryOrTries = 'Try';
    }
    
    return (
      <>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
          <button type="submit">input</button>
        </form>
        <div>{tryOrTries} : {triesLen}</div>
        <ul>
          {tries.map((t, idx) => {
            return (
              <li key={idx+t.try}>{t.try}, {t.result}</li>              
            );
          })}
        </ul>
      </>
    );
  }
}

module.exports = BullsAndCows;