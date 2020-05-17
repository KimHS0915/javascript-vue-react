const React = require('react');
const { useState, useRef, memo } = React;

const ReactionTimeTest = memo(() => {
  const [result, setResult] = useState([]);
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('Click anywhere to start');
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('Wait for green');
      timeOut.current = setTimeout(() => {
        setState('now');
        setMessage('Click');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(timeOut.current);
      setState('waiting');
      setMessage('Too soon! Click to try again');
    } else if (state === 'now') {
      endTime.current = new Date();
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
      setState('waiting');
      setMessage('Click anywhere to start');
    }
  };

  const renderAverage = () => {
    return (
      result.length === 0 ? null :
      <div>Average Time : {result.reduce((a, c) => a + c, 0) / result.length}ms</div>
    );
  };

  const onReset = () => {
    setResult([]);
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
          {message}
      </div>
      <button onClick={onReset}>Reset</button>
      {renderAverage()}
    </>
  );
});

module.exports = ReactionTimeTest;