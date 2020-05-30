import React, { memo } from 'react';
import { CODE } from './MineSweeper';

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
  
const TdChild = memo(({ onLeftClickTd, onRightClickTd, data }) => {
  return (
    <td 
      style={getTdStyle(data)} 
      onClick={onLeftClickTd} 
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  );
});

export default TdChild;