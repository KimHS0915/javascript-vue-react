<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('rock')">Rock</button>
      <button @click="onClickButton('paper')">Paper</button>
      <button @click="onClickButton('scissors')">Scissors</button>
    </div>
    <div>{{ result }}</div>
    <div>Win : {{ win }}, Draw : {{ draw }}, Lose : {{ lose }}</div>
  </div>
</template>

<script>
const coords = {
  rock: '0',
  paper: '-284px',
  scissors: '-142px',
};
const scoreboard = {
  rock: 1,
  paper: 2,
  scissors: 3
};
function comChoice (imgCoord) {
  return Object.entries(coords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};
let interval = null;
export default {
  data() {
    return {
      imgCoord: coords.paper,
      result: '',
      win: 0,
      draw: 0,
      lose: 0,
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(img/rockPaperScissors.jpg) ${this.imgCoord} 0`,
      };
    },
  },
  methods: {
    repeatRockPaperScissors() {
      interval = setInterval(() => {
        if (this.imgCoord === coords.rock) {
          this.imgCoord = coords.paper;
        } else if (this.imgCoord === coords.paper) {
          this.imgCoord = coords.scissors;
        } else if (this.imgCoord === coords.scissors) {
          this.imgCoord = coords.rock;
        }
      }, 100);
    },
    onClickButton(choice) {
      clearInterval(interval);
      const score = scoreboard[choice] - scoreboard[comChoice(this.imgCoord)];
      if (score == 0) {
        this.result = 'Draw'
        this.draw += 1
      } else if ([-2, 1].includes(score)) { // (score == -2 || score == 1)
        this.result = 'You Win'
        this.win += 1
      } else {
        this.result = 'You Lose'
        this.lose += 1
      }
      setTimeout(() => {
        this.repeatRockPaperScissors();
      }, 1000);
    }
  },
  mounted() {
    this.repeatRockPaperScissors();
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>