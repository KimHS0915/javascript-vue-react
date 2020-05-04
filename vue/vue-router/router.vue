<template>
<div>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><router-link to="/game/index" class="index">Index</router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/bulls-and-cows" class="router-link">Bulls And Cows</router-link>
            </a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/reaction-time-test" class="router-link">Reaction Time Test</router-link>
            </a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/lotto-generator" class="router-link">Lotto Generator</router-link>
            </a>
          </li>
          <li class="nav-item mx-3">
            <a class="nav-link" href="#">
              <router-link to="/game/rock-paper-scissors" class="router-link">Rock Paper Scissors</router-link>
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
.index {
  font-size: 30px;
  font-weight: bold;
  color: white;
}
.router-link {
  font-size: 20px;
  font-style: italic;
  color: white;
}
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
