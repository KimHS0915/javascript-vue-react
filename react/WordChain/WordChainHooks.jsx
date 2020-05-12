const React = require('react');
const { useState, useRef } = React;

const WordChain = () => {
  const [word, setWord] = useState('word');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length-1] === value[0]) {
      setResult('correct');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('incorrect');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.currentTarget.value);
  };
  
  return (
    <>
      <div>{word}</div>
      <br></br>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput} />
        <button>input</button>
      </form>
      <div>{result}</div>
    </>
    );
}

module.exports = WordChain;