<template>
<div>
  <div>{{ turn }}'s turn</div>
  <table-component />
</div>
</template>

<script>
import store from './store';
import TableComponent from './table-component';

export default {
  store,
  components: {
    'table-component': TableComponent,
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
