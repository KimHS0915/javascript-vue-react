import Vue from 'vue';
import VueRouter from 'vue-router';
import BullsAndCows from '../bulls-and-cows/bulls-and-cows';
import ReactionTimeTest from '../reaction-time-test/reaction-time-test';
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/bulls-and-cows', component: BullsAndCows },
    { path: '/reaction-time-test', component: ReactionTimeTest },
  ],
});
