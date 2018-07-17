import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from  './assets/components/authentication/Login';
import Register from  './assets/components/authentication/Register';
import Feed from './assets/components/Feed';
import Create from './assets/components/product/Create';
import Edit from './assets/components/product/Edit'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/feed',
      component: Feed,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/product/create',
      component: Create,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/product/:product/edit',
      component: Edit,
      meta: {
        forAuth: true
      }
    }
  ],
  linkActiveClass: 'btn-success',
  mode: 'history'
});


export default router
