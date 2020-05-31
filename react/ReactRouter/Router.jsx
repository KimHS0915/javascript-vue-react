import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BullsAndCows from '../BullsAndCows/BullsAndCowsClass';
import Lotto from '../Lotto/LottoClass';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/BullsAndCows">Bulls And Cows</Link>
        &nbsp;
        <Link to="/Lotto">Lotto</Link>
      </div>
      <div>
        <Route path="/BullsAndCows" component={BullsAndCows} />
        <Route path="/Lotto" component={Lotto} />
      </div>
    </BrowserRouter>
  );
};

export default Router;