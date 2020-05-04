<template>
<div>
  <div>
    <nav class="navbar navbar-expand-lg navbar-white bg-white">
      <a class="navbar-brand" href="#"><router-link to="/game/index">Index</router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/bulls-and-cows">Bulls And Cows</router-link>
            </a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/reaction-time-test">Reaction Time Test</router-link>
            </a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/lotto-generator">Lotto Generator</router-link>
            </a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/rock-paper-scissors">Rock Paper Scissors</router-link>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <p>
    <router-view></router-view>
  </p>
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
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
