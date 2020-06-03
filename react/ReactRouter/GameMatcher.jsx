import React, { Component } from 'react';

import BullsAndCows from '../BullsAndCows/BullsAndCowsClass';
import Lotto from '../Lotto/LottoClass';
import ReactionTimeTest from '../ReactionTimeTest/ReactionTimeTestClass';
import RockPaperScissors from '../RockPaperScissors/RockPaperScissorsClass';

class GameMatcher extends Component {
  render() {
    if (this.props.match.params.name === 'BullsAndCows') {
      return <BullsAndCows />
    } else if (this.props.match.params.name === 'Lotto') {
      return <Lotto />
    } else if (this.props.match.params.name === 'ReactionTimeTest') { 
      return <ReactionTimeTest />
    } else if (this.props.match.params.name === 'RockPaperScissors') {
      return <RockPaperScissors />
    } else {
      return <div></div>
    }
  }
}

export default GameMatcher;