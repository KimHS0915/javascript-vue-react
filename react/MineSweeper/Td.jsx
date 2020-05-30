import React, { useContext, useCallback, memo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSweeper';
import TdChild from './TdChild';

const Td = memo(({ rowIndex, cellIndex }) => {
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
    <TdChild onLeftClickTd={onLeftClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIdx][cellIndex]} />
    );
});

export default Td;
