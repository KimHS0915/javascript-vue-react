<template>
<div>
  <div>{{ turn }}'s turn</div>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{ cellData }}</td>
    </tr>
  </table>
</div>
</template>

<script>
import { mapState } from 'vuex';
import store, { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER } from './store';

export default {
  store,
  computed: {
    ...mapState(['winner', 'turn', 'tableData'])
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
      if (this.cellData) return;

      this.$store.commit('CLICK_CELL', { row: rowIndex, cell: cellIndex });

      let win = false;
      if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tabledata[rowIndex][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
        win = true;
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
        win = true;
      }
      if (win) {
        this.$store.commit(SET_WINNER, this.turn);
        alert(this.winner + ' Win!');
        this.$store.commit(RESET_GAME);
      } else {
        let all = true;
        this.tableData.forEach((row) => {
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          alert('Draw!');
          this.$store.commit(NO_WINNER);
          this.$store.commit(RESET_GAME);
        } else {
          this.$store.commit(CHANGE_TURN);
        }
      }
    }
  }
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 80px;
  height: 80px;
  text-align: center;
  font-size: 50px;
}
</style>
