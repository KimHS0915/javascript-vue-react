import React, { useContext } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSweeper';

const Table = () => {
  const { tableData } = useContext(TableContext);
  
  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((tr, i) => <Tr key={i} rowIndex={i} />)}
      </tbody>
    </table>
  );
};

export default Table;