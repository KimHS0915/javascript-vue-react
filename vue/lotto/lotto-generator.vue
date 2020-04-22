<template>
  <div>
    <div>Winning Number</div>
    <div id="result">
      <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
    </div>
    <div>Bonus</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="reset" @click="onClickReset">Reset</button>
  </div>
</template>

<script>
import LottoBall from './lotto-ball';

function getWinNumbers() {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}
const timeouts = [];
export default {
  components: {
    'lotto-ball': LottoBall,
  },
  data() {
    return {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      reset: false,
    };
  },
  methods: {
    onClickReset() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.reset = false;
      this.showBalls();     
    },  
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.reset = true;
      }, 7000);
    },
  },
  mounted() {
    this.showBalls();
  },
  beforeDestroy() {
    timeouts.forEach((t) => {
      clearTimeout(t);
    });
  },
};
</script>

<style scoped>

</style>