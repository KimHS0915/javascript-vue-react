import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSweeper';

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL_BOX:
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.OPENED_BOX:
      return {
        background: 'white',
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'red',
      }
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'orange',
      }
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL_BOX:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return 'B';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    default:
      return code || '';
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, pause } = useContext(TableContext);
  const rowIdx = rowIndex.rowIndex

  const onLeftClickTd = useCallback(() => {
    if (pause) {
      return;
    }
    switch (tableData[rowIdx][cellIndex]) {
      case CODE.OPENED_BOX:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;

      case CODE.NORMAL_BOX:
        dispatch({ type: OPEN_CELL, row: rowIdx, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIdx, cell: cellIndex });
        return
    }
  }, [tableData[rowIdx][cellIndex], pause]);

  const onRightClickTd = useCallback((e) => {
    if (pause) {
      return;
    }
    e.preventDefault();
    switch (tableData[rowIdx][cellIndex]) {
      case CODE.NORMAL_BOX:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIdx, cell: cellIndex });
        return;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({ type: QUESTION_CELL, row: rowIdx, cell: cellIndex });
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: NORMALIZE_CELL, row: rowIdx, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIdx][cellIndex], pause]);

  return (
    <td 
      style={getTdStyle(tableData[rowIdx][cellIndex])} 
      onClick={onLeftClickTd} 
      onContextMenu={onRightClickTd}
    >{getTdText(tableData[rowIdx][cellIndex])}</td>
  );
};

export default Td;
