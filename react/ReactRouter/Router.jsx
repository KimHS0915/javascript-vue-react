import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import BullsAndCows from '../BullsAndCows/BullsAndCowsClass';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/BullsAndCows">Bulls And Cows</Link>
      </div>
      <div>
        <Route path="/BullsAndCows" component={BullsAndCows} />
      </div>
    </BrowserRouter>
  );
};

export default Router;