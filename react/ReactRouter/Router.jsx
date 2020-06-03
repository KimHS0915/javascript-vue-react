import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import GameMatcher from './GameMatcher';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/game/index" className="index">Index</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"       data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"       aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item mx-3">
                  <Link to="/game/BullsAndCows" className="router-link">Bulls And Cows</Link>
                </li>
                <li className="nav-item mx-3">
                  <Link to="/game/Lotto" className="router-link">Lotto</Link>
                </li>
                <li className="nav-item mx-3">
                  <Link to="/game/ReactionTimeTest" className="router-link">Reaction Time Test</Link>
                </li>
                <li className="nav-item mx-3">
                  <Link to="/game/RockPaperScissors" className="router-link">Rock Paper Scissors</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div>
          <Route path="/game/:name" component={GameMatcher} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;