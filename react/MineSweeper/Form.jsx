import React, { useState, useCallback, useContext } from 'react';
import { START_GAME, TableContext } from './MineSweeper';

const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickButton = useCallback((e) => {
    dispatch({ type: START_GAME, row, cell, mine });    
  }, [row, cell, mine]);

  return (
    <div>
      <input type="number" placeholder="vertical" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="horizontal" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="mine" value={mine} onChange={onChangeMine} />
      <button onClick={onClickButton}>run</button>
    </div>
  );
};

export default Form;