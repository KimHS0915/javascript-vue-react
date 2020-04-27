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
};
</script>
