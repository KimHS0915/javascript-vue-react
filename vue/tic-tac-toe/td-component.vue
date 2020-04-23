<template>
  <td @click="onClickTd">{{ cellData }}</td>  
</template>

<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },
  methods: {
    onClickTd() {
      console.log(this.$root.$data);
      this.$set(this.$root.$data.tableData[this.rowIndex], this.cellIndex, this.$root.$data.turn);
      this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';
    }
  }
};
</script>
