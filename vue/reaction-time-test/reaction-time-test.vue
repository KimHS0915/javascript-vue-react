<template>
  <div>
    <div id="screen">{{ message }}</div>
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
    }
  },
  method: {
    onReset() {}
  }
};
</script>

<style>

</style>