<template>
<div>
  <mine-form />
  <div>{{ timer }}</div>
  <table-component />
  <div>{{ result }}</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import store from './store';
import TableComponent from './table-component';

export default {
  store,
  components: {
    'table-component': TableComponent,
  },
  computed: {
    ...mapState(['timer', 'result'])
  },
  methods: {

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
