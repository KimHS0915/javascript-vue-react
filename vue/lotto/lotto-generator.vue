<template>
  <div>
    <div>Winning Number</div>
    <div id="result">
      <lotto-ball v-for="ball in winBalls" :key="ball"></lotto-ball>
    </div>
    <div>Bonus</div>
    <lotto-ball v-if="bonus"></lotto-ball>
    <button v-if="reset">Reset</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      winBalls: [],
      bonus: null,
      reset: false,
    };
  },
  computed: {
  
  },
  methods: {

  },
  mounted() {

  },
  beforeDestroy() {

  },
};
</script>

<style scoped>

</style>