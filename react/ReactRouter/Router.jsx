import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import GameMatcher from './GameMatcher';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/index">Index</Link>
        &nbsp;
        <Link to="/game/BullsAndCows">Bulls And Cows</Link>
        &nbsp;
        <Link to="/game/Lotto">Lotto</Link>
        &nbsp;
        <Link to="/game/ReactionTimeTest">Reaction Time Test</Link>
      </div>
      <div>
        <Route path="/game/:name" component={GameMatcher} />
      </div>
    </BrowserRouter>
  );
};

export default Router;