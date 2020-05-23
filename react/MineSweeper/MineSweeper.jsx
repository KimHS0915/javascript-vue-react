import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form'

export const CODE = {};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

const plantMine = () => {};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };
    default:
      return state;
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ tableData: state.tableData, dispatch}), [state.tableData]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;