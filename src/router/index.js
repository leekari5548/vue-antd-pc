import Vue from 'vue'
import Router from 'vue-router'
import main from "../components/main";
import register from "../components/register";
import login from "../components/login";
import MainContent from "../components/MainContent";
import adminIndex from "../components/admin/adminIndex";
import blogIndex from "../components/blog-module/blogIndex";
import blogList from "../components/blog-module/blogList";
import forumIndex from "../components/forum/forumIndex";
import resourceIndex from "../components/source-download/resourceIndex";
import questionIndex from "../components/question/questionIndex";
import newBlog from "../components/blog-module/newBlog";
import blogDetail from "../components/blog-module/blogDetail";
import toolsIndex from "../components/tools/toolsIndex";

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
    {
      path: '/admin/index',
      name: 'adminIndex',
      component: adminIndex
    },
    {
      path: '/blog/detail',
      name: 'blogDetail',
      component: blogDetail
    },
    {
      path: '/blog/list',
      name: 'blogList',
      component: blogList
    },
    {
      path: '/forum/index',
      name: 'forumIndex',
      component: forumIndex
    },
    {
      path: '/resource/index',
      name: 'resourceIndex',
      component: resourceIndex
    },
    {
      path: '/question/index',
      name: 'questionIndex',
      component: questionIndex
    },
    {
      path: '/blog/new',
      name: 'newBlog',
      component: newBlog
    },
    {
      path: '/tools/index',
      name: 'toolsIndex',
      component: toolsIndex
    },
  ]
})
