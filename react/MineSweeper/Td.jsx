import React, { useContext } from 'react';
import { TableContext, CODE } from './MineSweeper';

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
    default:
      return '';
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData } = useContext(TableContext);
  const rowIdx = rowIndex.rowIndex

  return (
    <td style={getTdStyle(tableData[rowIdx][cellIndex])}>{getTdText(tableData[rowIdx][cellIndex])}</td>
  );
};

export default Td;
