<template>
<div>
  <div>
    <router-link to="/game/index">Index</router-link>
    <router-link to="/game/bulls-and-cows">Bulls And Cows</router-link>
    <router-link to="/game/reaction-time-test">Reaction Time Test</router-link>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import router from './routes';

export default {
  router,
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
