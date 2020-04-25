<template>
<div>
  <div>{{ turn }}'s turn</div>
  <table-component :table-data="tableData" />
</div>
</template>

<script>
import TableComponent from './table-component';
import EventBus from './event-bus';

export default {
  components: {
    'table-component': TableComponent,
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O',
      winner: '',
    };
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
      this.$set(this.tableData[rowIndex], cellIndex, this.turn);

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
        this.winner = this.turn;
        alert(this.winner + ' Win!')
        this.turn = 'O';
        this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
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
          alert('Draw!')
          this.winner = '';
          this.turn = 'O';
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else {
          this.turn = (this.turn === 'O' ? 'X' : 'O');
        }
      }
    }
  },
  created() {
    EventBus.$on('clickTd', this.onClickTd);
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
