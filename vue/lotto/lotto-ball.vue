<template>
  <div class="ball" :style="styleObject">{{ number }}</div>
</template>

<script>
export default {
  props: {
    number: Number,    
  },
  computed: {
    styleObject() {
      let background;
      if (this.number <= 10) {
        background = 'red';
      } else if (this.number <= 20) {
        background = 'orange';
      } else if (this.number <= 30) {
        background = 'yellow';
      } else if (this.number <= 40) {
        background = 'skyblue';
      } else {
        background = 'green';
      }
      return {
        background,
      }
    }
  }
}
</script>

<style scoped>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  text-align: center;
  margin-right: 10px;
  font-size: 12px;
  font-weight: 'bold';
}
</style>