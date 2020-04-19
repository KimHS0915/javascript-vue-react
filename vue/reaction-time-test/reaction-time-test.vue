<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <div v-show="result.length">
      <div>{{ result[result.length-1] }}ms</div>
      <div>Average Time : {{ average }}ms</div>
      <button @click="onReset">Reset</button>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeOut = null;
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: 'Click anywhere to start',
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length;
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === 'waiting') {
        this.state = 'ready';
        this.message = 'Wait for green';
        timeOut = setTimeout(() => {
          this.state = 'now';
          this.message = 'Click!';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000)
      } else if (this.state === 'ready') {
        clearTimeout(timeOut);
        this.state = 'waiting';
        this.message = 'Too soon! Click to try again';        
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = 'Click anywhere to start';
        this.result.push(endTime - startTime);
      }
    },
  },
};
</script>

<style scoped>
#screen {
  width: 500px;
  height: 300px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  background-color: green;
  color: white;
}
</style>