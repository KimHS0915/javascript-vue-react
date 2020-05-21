import React, { useState } from 'react';

const TicTacToe = () => {
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState('');
  const [tableData, setTableData] = useState(['', '', ''], ['', '', ''], ['', '', '']);

  return (
    <>
      <Table />
      {winner && <div>{winner} Win</div>}
    </>
  );
};

export default TicTacToe;