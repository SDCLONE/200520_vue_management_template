import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "../views/Login";
import Manage from "../views/Manage";
import Service1 from "../views/services/Service1";
import Service2 from "../views/services/Service2";
import Register from "../views/Register";

import NotFound from "../views/NotFound";
import RegisterCompletion from "../views/RegisterCompletion";
import FindPassword from "../views/FindPassword";

Vue.use(VueRouter);

  const routes = [
      {path: '/', redirect:'/login'},
      {path: '/login',name:'login',component:Login},
      {path: '/register',name: 'register',component: Register},
      {path: '/register/completion',name: 'registerCompletion',component: RegisterCompletion},
      {path: '/findPass',name: 'findPass',component: FindPassword},
      {
          path:'/manage',
          component:Manage,
          children:[
              //配置二级路由
              {path:'/',redirect:'/manage/service1'},
              {path:'service1',component:Service1,props:{activeMenu:'/manage/service1'}},
              {path:'service2',component:Service2,props:{activeMenu:'/manage/service2'}}
          ]
      },
      {path:'*',component: NotFound}

  ];

const router = new VueRouter({
  routes,
    mode:'history'
});

export default router
