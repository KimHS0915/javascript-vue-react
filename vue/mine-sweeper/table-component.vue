<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" :style="cellDataStyle(rowIndex, cellIndex)">{{ cellDataText(rowIndex, cellIndex) }}</td>
    </tr>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import { CODE } from './store';

export default {
  computed: {
    ...mapState(['tableData']),
    cellDataStyle(state) {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.NORMAL_BOX:
        case CODE.MINE:
          return {
            background: '#444',
          };
        case CODE.CLICKED_MINE:
        case CODE.OPEN_BOX:
          return {
            background: 'white',
          };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          return {
            background: 'red',
          };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          return {
            background: 'orange',
          }
        default:
          return {};
        }
      }
    },
    cellDataText() {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
            return 'X';
          case CODE.NORMAL_BOX:
            return '';
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return '!';
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return '?';
          case CODE.CLICKED_MINE:
            return 'B';
          default:
            return '';
        }
      }
    },
  }
};
</script>
