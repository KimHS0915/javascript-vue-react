const React = require('react');
const { useState, useRef, memo } = React;
const TryAndResult = require('./TryAndResultHooks');

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const BullsAndCows = memo(() => {
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputE = useRef(null);

  const reset = () => {
    setValue('');
    setAnswer(getNumbers());
    setTries([]);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      alert(`Answer is ${answer.join('')}, You Win!`);
      reset();
      inputE.current.focus();
    } else if (tries.length >= 9) {
      alert(`You Lose!, Answer is ${answer.join('')}`);
      reset();
      inputE.current.focus();
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
      setTries((prevTries) => [...prevTries, {try: value, result: `bulls : ${bulls}, cows : ${cows}`}]);
      setValue('');
      inputE.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  let tryOrTries;

  if (tries.length > 1) {
    tryOrTries = 'Tries';
  } else {
    tryOrTries = 'Try';
  }
  
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <input ref={inputE} maxLength={4} value={value} onChange={onChangeInput} />
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
});
  
module.exports = BullsAndCows;