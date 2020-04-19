<template>
  <div>
    <div id="screen" v-bind:class="state">{{ message }}</div>
    <div>
      <div>Average Time : </div>
      <button @click="onReset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: 'Click anywhere to start',
    };
  },
  method: {
    onReset() {
      
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