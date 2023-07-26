import Vue from 'vue'
import App from './App.vue'

// import { Row , Button} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import './api/mock'
import Cookies from 'js-cookie';

Vue.config.productionTip = false

// Vue.use(Row);
// Vue.use(Button);
// Vue.component('el-container',Container)

// 全局引入
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
    if(!token && to.name !== 'login') {
      next({ name: 'login' });
    }
    else if (token && to.name === 'login') {
      next({ name: 'home'})
    }else {
      next()
    }
})

new Vue({
  el:'#app',
  router,
  store,
  created() {
    store.commit('addMenu', router)
  },
  render: h => h(App),
});
