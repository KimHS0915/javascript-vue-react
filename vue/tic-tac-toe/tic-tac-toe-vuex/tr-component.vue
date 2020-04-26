<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :cell-data="cellData" :cell-index="index" :row-index="rowIndex" :key="index"></td-component>
  </tr>
</template>

<script>
import TdComponent from './td-component';

export default {
  components: {
    'td-component': TdComponent,
  },
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    },
  },
  props: {
    rowIndex: Number,
  },
};
</script>
