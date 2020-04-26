<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from 'vuex';
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';

export default {
  props: {
    rowIndex: Number,
    cellIndex: Number,
  },
  computed: {
    ...mapState({
      tableData: state => state.tableData,
      winner: state => state.winner,
      turn: state => state.turn,
      cellData(state) {
        return state.tableData[this.rowIndex][this.cellIndex];
      },
    }),
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
