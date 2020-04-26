<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :row-index="index" :key="index"></tr-component>
  </table>
</template>

<script>
import TrComponent from './tr-component';

export default {
  components: {
    'tr-component': TrComponent,
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
  },
};
</script>
