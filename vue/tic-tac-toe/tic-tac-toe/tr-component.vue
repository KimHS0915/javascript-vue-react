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
  props: {
    rowData: Array,
    rowIndex: Number,
  },
};
</script>
