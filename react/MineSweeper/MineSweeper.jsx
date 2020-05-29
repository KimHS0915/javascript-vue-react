import React, { useReducer, createContext, useMemo, useEffect, useState } from 'react';
import Table from './Table';
import Form from './Form'

export const CODE = {
  OPENED_BOX: 'OPENED_BOX',
  QUESTION: 'QUESTION',
  FLAG: 'FLAG',
  FLAG_MINE: 'FLAG_MINE',
  QUESTION_MINE: 'QUESTION_MINE',
  CLICKED_MINE: 'CLICKED_MINE',
  NORMAL_BOX: 'NORMAL_BOX',
  MINE: 'MINE',
}

export const TableContext = createContext({
  tableData: [],
  pause: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: '',
  result: null,
  pause: true,
  countOpenBox: 0,
};

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL_BOX);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        tableData: plantMine(action.row, action.cell, action.mine),
        result: '',
        pause: false,
        countOpenBox: 0,
        timer: 0,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];      
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });
      let countOpenBox = 0;
      const checked = [];
      const checkAround = (row, cell) => {
        if ([CODE.OPENED_BOX, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])) {
          return;
        }
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        }
        if (checked.includes(row + ',' + cell)) {
          return;
        } else {
          checked.push(row + ',' + cell);
        }
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1], 
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          );
        }
        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1],
        );
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          );
        }
        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row -1 > -1) {
              near.push([row - 1, cell -1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED_BOX) {
                checkAround(n[0], n[1]);
              }
            });
          }
        }
        if (tableData[row][cell] === CODE.NORMAL_BOX) {
          countOpenBox += 1;
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      let pause = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.countOpenBox + countOpenBox) {
        pause = true;
        result = "You Win";
      }
      return {
        ...state,
        tableData,
        countOpenBox: state.countOpenBox + countOpenBox,
        pause,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        pause: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] !== CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG;
      } else if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] !== CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION;
      } else if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] !== CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.NORMAL_BOX;
      } else if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, pause, timer, result } = state;

  const value = useMemo(() => ({ tableData, pause, dispatch }), [tableData, pause]);

  useEffect(() => {
    let timer;
    if (pause === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, [pause]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;