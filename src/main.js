import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'axios'
import ElementUI from 'element-ui' // import element-ui
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = Axios

Vue.use(VueRouter)
Vue.use(ElementUI)

import Home from './components/Home'
import Homepage from './components/Homepage'
import NotFound from './components/404'

const router =  new VueRouter({
  mode: 'history',
  base: __dirname, 
  routes: [
    {
      path: '/',  
      component: Home
    },
    {
      path: '/Homepage',
      component: Homepage
    },
    {
      path: '*',
      component: NotFound 
    }
  ]
})

router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('user-token');
  if(to.path == '/'){ // to home page
    if(token != 'null' && token != null){
      next('/homepage') // if token exist then go to homepage
    }
    next(); //if not return back
  }else{
    if(token != 'null' && token != null){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // set token in header 
      next() // if token exist then next page
    }else{
      alert('Unauthorize')
      next('/') // if not return to homepage
    }
  }
})

const app = new Vue({
  router: router, 
  render: h => h(App) 
}).$mount('#app') 