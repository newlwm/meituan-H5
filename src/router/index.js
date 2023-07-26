import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../View/Home.vue'
import User from '../View/User.vue'
// import { component } from 'vue/types/umd'
import Main from '../View/Main.vue'
import Mall from '../View/Mall.vue'
import PageOne from '../View/PageOne.vue'
import PageTwo from '../View/PageTwo.vue'
import Login from '../View/Login.vue'

Vue.use(VueRouter)

//路由的使用步骤，1：创建路由组件
// 2、将路由和组件进行映射
// 3、创建router实例

const routes = [
  {
    path:'/',
    component: Main,
    name:'Main',
    redirect:'/home',  //重导向
    children : [
      // { path: 'home', name : 'home', component: Home },
      // { path: 'user', name : 'user', component: User },
      // { path: 'mall', name : 'mall', component: Mall },
      // { path: 'page1',name : 'page1',  component: PageOne },
      // { path: 'page2',name : 'page2', component: PageTwo },
  ]
},
  {
    path: '/Login',
    name: 'login',
    component:Login
  }
    
  ]
  const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })
  export default router
