const React = require('react');
const { Component } = React;

const MultiplicationTable = () => {
  const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const inputRef = React.useRef(null);

  const onChangeInput = (e) => {
      setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
      e.preventDefault();
      if (parseInt(value) === first * second) {
          setResult(`${first} X ${second} = ${value}, correct`);
          setFirst(Math.ceil(Math.random() * 9));
          setSecond(Math.ceil(Math.random() * 9));
          setValue('');
          inputRef.current.focus();
      } else {
          setResult(`${first} X ${second} = ${value}, incorrect`);
          setValue('');
          inputRef.current.focus();
      }
  };

  return (
      <React.Fragment>
          <div>{first} X {second} = ?</div>
          <form onSubmit={onSubmitForm}>
              <input ref={inputRef} onChange={onChangeInput} value={value} />
              <button>input</button>                            
          </form>
          <div id="result">{result}</div>
      </React.Fragment>
  );
}

module.exports = MultiplicationTable;