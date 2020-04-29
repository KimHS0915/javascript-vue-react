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
import store, { INCREMENT_TIMER } from './store';
import TableComponent from './table-component';
import MineForm from './mine-form';

let interval;

export default {
  store,
  components: {
    'table-component': TableComponent,
    'mine-form': MineForm,
  },
  computed: {
    ...mapState(['timer', 'result', 'pause'])
  },
  methods: {

  },
  watch: {
    pause(value, oldValue) {
      if (value === false) {
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        }, 1000);
      } else {
        clearInterval(interval);
      }
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 30px;
}
</style>
