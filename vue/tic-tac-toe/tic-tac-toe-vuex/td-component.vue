<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';

export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },
  computed: {
    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    },
    tableData() {
      return this.$store.state.tableData;
    },
    winner() {
      return this.$store.state.winner;
    },
    turn() {
      return this.$store.state.turn;
    },
  },
  methods: {
    onClickTd() {
      if (this.cellData) return;

      this.$store.commit('CLICK_CELL', { row: this.rowIndex, cell: this.cellIndex });

      let win = false;
      if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tabledata[this.rowIndex][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn) {
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
