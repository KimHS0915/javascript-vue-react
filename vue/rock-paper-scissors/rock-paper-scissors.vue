<template>
  <div>
    <div id="computer"></div>
    <div>
      <button>Rock</button>
      <button>Paper</button>
      <button>Scissors</button>
    </div>
    <div>{{ result }}</div>
    <div>Score : {{ score }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: '',
      score: 0,
    };
  },
  computed: {

  },
};
</script>

<style scoped>

</style>