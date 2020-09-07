<template>
  <a-layout-sider v-model="collapsed" collapsible>
    <div class="logo" :style="logoStyle">
      <span style="font-family: Apple,serif;color: white;font-size: 20px"><a @click.prevent="index" href="">LEEKARI</a></span>
    </div>
    <a-affix :offset-top="20">
    <a-menu :theme="theme" mode="vertical-right" style="float: top;margin: 2%">
      <a-menu-item>
        <a-icon type="mail" />
        <span><router-link :to="{path:'/blog/list'}" style="color: #e6f7ff">博客</router-link></span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="mail" />
        <span><router-link :to="{path:'/forum/index'}" style="color: #e6f7ff">论坛</router-link></span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="mail" />
        <span><router-link :to="{path:'/question/index'}" style="color: #e6f7ff">问答</router-link></span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="mail" />
        <span><router-link :to="{path:'/resource/index'}" style="color: #e6f7ff">下载</router-link></span>
      </a-menu-item>
<!--      <a-menu-item v-if="pageType === 2">-->
<!--        <a-icon type="mail" />-->
<!--        <span><router-link :to="{path:'/blog/index'}" style="color: #e6f7ff">资源管理</router-link></span>-->
<!--      </a-menu-item>-->
<!--      <a-menu-item v-if="pageType === 2">-->
<!--        <a-icon type="mail" />-->
<!--        <span><router-link :to="{path:'/blog/index'}" style="color: #e6f7ff">菜单管理</router-link></span>-->
<!--      </a-menu-item>-->
<!--      <a-menu-item v-if="pageType === 2">-->
<!--        <a-icon type="mail" />-->
<!--        <span><router-link :to="{path:'/blog/index'}" style="color: #e6f7ff">文章管理</router-link></span>-->
<!--      </a-menu-item>-->
<!--      <a-menu-item v-if="pageType === 2">-->
<!--        <a-icon type="mail" />-->
<!--        <span><router-link :to="{path:'/blog/index'}" style="color: #e6f7ff">系统管理</router-link></span>-->
<!--      </a-menu-item>-->
<!--      <a-menu-item v-if="pageType === 2">-->
<!--        <a-icon type="mail" />-->
<!--        <span><router-link :to="{path:'/blog/index'}" style="color: #e6f7ff">用户管理</router-link></span>-->
<!--      </a-menu-item>-->
    </a-menu>
    </a-affix>
  </a-layout-sider>
</template>

<script>
import baseUrl from '../utils/baseUrl'
import qs from 'qs'
export default {
  name: "MainMenu",
  data() {
    return {
      collapsed: false,
      data:[],
      pageType: 0,
      theme:'dark',
      logoStyle:'background: rgb(3,22,39);width: 10vh;height: 5%;margin-left:10vh'
    }
  },
  beforeUpdate() {
    // this.dateHandler()
  },
  methods:{
    dateHandler(){
      let date = new Date()
      let h = date.getHours()
      if (h > 18 || h < 6) {
        this.theme = 'dark'
        this.logoStyle = 'background: rgb(3,22,39);width: 10%;height: 5%;margin-left:40%'
      }else {
        this.theme = 'light'
        this.logoStyle = 'background: rgb(255,255,255);width: 10%;height: 5%;margin-left:40%'
      }
    },
    changePage(page){
      if (page === 1) {
        this.$router.push('/blog/list')
      }
    },
    initMenu(){
      let role = this.$session.get('role')
      if (role === 0 || role === undefined) {
        this.pageType = 0
      }else if (role === 509){
        this.pageType = 2
      }
    },
    index(){
      this.$router.push("/")
      this.$router.go(0)
    }
  },
  beforeMount() {
    this.initMenu()
    // this.dateHandler()
  }
}
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>