<template>
  <div v-if="currentGame === 'bulls-and-cows'">
    <bulls-and-cows></bulls-and-cows>
  </div>
  <div v-else-if="currentGame === 'reaction-time-test'">
    <reaction-time-test></reaction-time-test>
  </div>
  <div v-else-if="currentGame === 'lotto-generator'">
    <lotto-generator></lotto-generator>
  </div>
  <div v-else-if="currentGame === 'rock-paper-scissors'">
    <rock-paper-scissors></rock-paper-scissors>
  </div>
</template>

<script>
import BullsAndCows from '../bulls-and-cows/bulls-and-cows';
import ReactionTimeTest from '../reaction-time-test/reaction-time-test';
import LottoGenerator from '../lotto/lotto-generator';
import RockPaperScissors from '../rock-paper-scissors/rock-paper-scissors';

export default {
  components: {
    'bulls-and-cows': BullsAndCows,
    'reaction-time-test': ReactionTimeTest,
    'lotto-generator': LottoGenerator,
    'rock-paper-scissors': RockPaperScissors,
  },
  computed: {
    currentGame() {
      return this.$route.params.name;
    },
  },
};
</script>