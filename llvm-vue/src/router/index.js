import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'first',
  },
  {
    path: '/first',
    name: 'first',
    component: () => import(/* webpackChunkName: "first" */ "../views/first.vue"),
  },
  {
    path: '/second',
    name: 'second',
    component: () => import(/* webpackChunkName: "second" */ "../views/second.vue"),
  },
  {
    path: '/third',
    name: 'third',
    component: () => import(/* webpackChunkName: "third" */ "../views/third.vue"),
  },
];

const router = new VueRouter({
  routes
});

export default router;
