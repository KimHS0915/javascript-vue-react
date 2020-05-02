<template>
  <div v-if="currentGame === 'bulls-and-cows'"><bulls-and-cows></bulls-and-cows></div>
  <div v-else-if="currentGame === 'reaction-time-test'"><reaction-time-test></reaction-time-test></div>
</template>

<script>
import BullsAndCows from '../bulls-and-cows/bulls-and-cows';
import ReactionTimeTest from '../reaction-time-test/reaction-time-test';

export default {
  components: {
    'bulls-and-cows': BullsAndCows,
    'reaction-time-test': ReactionTimeTest,
  },
  mounted() {
    console.log(this.$router);
    console.log(this.$route);
  },
  computed: {
    currentGame() {
      return this.$route.params.name;
    },
  },
};
</script>