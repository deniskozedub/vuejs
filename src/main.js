import Vue from 'vue';
import App from './App.vue';
import  Router from './routes';
import VueResource from 'vue-resource';
import Auth from './packeges/auth/Auth';
import VeeValidate from 'vee-validate'

Vue.use(VueResource);
Vue.use(Auth);
Vue.use(VeeValidate)
Vue.http.options.root = 'http://back.demo';
Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken();


Vue.http.interceptors.push((request, next) =>{
  next( response => {
    if (response.status == 404)
      swal(response.status.toString(), response.body.error, 'error')

    else if ( response.status == 500)
      swal(response.status.toString(), response.body.message, 'error')

  })
})


Router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.isAuthenticated()){
        next({
          path: '/feed'
        })
      }else next()
    }
    else if (to.matched.some(record => record.meta.forAuth)) {
      if ( !Vue.auth.isAuthenticated()){
        next({
          path: '/login'
        })
      }else next()
    }


    else next()
  }
);

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router
});
