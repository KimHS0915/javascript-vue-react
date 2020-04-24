<template>
  <table-component :table-data="tableData" />
</template>

<script>
import TableComponent from './table-component';

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
    };
  },
  methods: {

  },
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