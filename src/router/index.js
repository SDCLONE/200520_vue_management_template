import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "../views/Login";
import Manage from "../views/Manage";

Vue.use(VueRouter);

  const routes = [
    {path: '/', redirect:'/login'},
    {path: '/login',name:'login',component:Login},
    {path:'/manage',name:'manage',component:Manage}

  ];

const router = new VueRouter({
  routes
});

export default router
