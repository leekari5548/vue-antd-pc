import Vue from 'vue'
import Router from 'vue-router'
import main from "../components/main";
import register from "../components/register";
import login from "../components/login";
import MainContent from "../components/MainContent";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainContent
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: MainContent
    },
  ]
})
