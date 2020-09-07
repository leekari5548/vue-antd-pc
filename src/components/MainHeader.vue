<template>
    <a-layout-header class="header">
<!--      <a-space size="large">-->
      <a-row>
        <a-col :span="2">
          <a @click="goIndex('/')" style="font-family: Apple,serif;color: #e6f7ff;float: left">LEEKARI</a>
        </a-col>
        <a-col :span="1">
          <a @click="goIndex('/blog/list')" style="font-family: Apple,serif;color: #e6f7ff;float: left">博客</a>
        </a-col>
        <a-col :span="1">
          <a @click="goIndex('/forum/index')" style="font-family: Apple,serif;color: #e6f7ff;float: left">论坛</a>
        </a-col>
        <a-col :span="1">
          <a @click="goIndex('/question/index')" style="font-family: Apple,serif;color: #e6f7ff;float: left">问答</a>
        </a-col>
        <a-col :span="1">
          <a @click="goIndex('/resource/index')" style="font-family: Apple,serif;color: #e6f7ff;float: left">下载</a>
        </a-col>
        <a-col :span="1">
          <a @click="goIndex('/tools/index')" style="font-family: Apple,serif;color: #e6f7ff;float: left">工具</a>
        </a-col>
        <a-col v-if="showSuperAdminBtn" :span="1">
          <a-dropdown style="float: right"  :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <span style="font-family: Apple,serif;color: #e6f7ff;float: left">管理<a-icon type="down"/></span>
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="sourceManager">
                <a @click="changeMethod('sourceManager')">资源管理</a>
              </a-menu-item>
              <a-menu-item key="menuManager">
                <a @click="changeMethod('menuManager')">菜单管理</a>
              </a-menu-item>
              <a-menu-item key="userManager">
                <a @click="changeMethod('userManager')">用户管理</a>
              </a-menu-item>
              <a-menu-item key="logManager">
                <a @click="changeMethod('logManager')">日志管理</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-col>
        <a-col v-if="!showSuperAdminBtn" :span="1">
          &nbsp;
        </a-col>
        <a-col :span="14" v-show="!isLogin">&nbsp;</a-col>
        <a-col :span="13" v-show="isLogin">&nbsp;</a-col>
        <a-col :span="2" v-show="isLogin">
          <span style="font-family: Apple,serif;color: #e6f7ff" v-if="isLogin">欢迎您，<b>{{username}}</b></span>
        </a-col>
        <a-col :span="1" v-show="isLogin">
          <a-dropdown v-if="isLogin" style="float: right"  :trigger="['hover']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <span>
                <a-badge :count="messageCount"><a-avatar shape="square" :src="avatar"/></a-badge>
              </span>
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="h-1">
                <a @click="changeMethod('h-1')">与我相关</a>
              </a-menu-item>
              <a-menu-item key="h-2">
                <a @click="changeMethod('h-2')">个人信息</a>
              </a-menu-item>
              <a-menu-item key="h-3">
                <a @click="changeMethod('h-3')">站内通知</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="h-5">
                <a @click="exit">
                  退出
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-col>
        <a-col :span="1" v-show="!isLogin">
          <a @click="goIndex('/login')" style="font-family: Apple,serif;color: #e6f7ff;float: left">登录</a>
        </a-col>
        <a-col :span="1" v-show="!isLogin">
          <a @click="goIndex('/register')" style="font-family: Apple,serif;color: #e6f7ff;float: left">注册</a>
        </a-col>
      </a-row>
    </a-layout-header>
</template>

<script>
import baseUrl from '../utils/baseUrl'
export default {
  name: "MainHeader",
  data(){
    return{
      messageCount:0,
      username:'',
      avatar:'http://localhost:8080/file/download/fe180f52cb9b4212ae067fc199d3e77f',
      isLogin: false,
      active: '',
      showSuperAdminBtn:false,
    }
  },
  methods:{
    isLoginMethod(){
      let userinfo = this.$session.get('userinfo')
      if (userinfo !== '' && userinfo !== undefined) {
        this.isLogin = true
        let userinfo = this.$session.get('userinfo')
        this.showSuperAdminBtn = userinfo.role === 509
        this.avatar = `${baseUrl}${userinfo.picture}`
        this.username = userinfo.nickname
      }else{
        this.isLogin = false
      }

    },
    goIndex(route){
      this.$router.push(route)
    },
    changeMethod(btn){
        this.active = btn
      this.$emit('btn-change',btn)
    },
    exit(){
      this.$session.set('userinfo','')
      this.$session.set('token','')
      this.$session.set('userId','')
      this.$router.go(0)
    }
  },
  beforeMount() {
    // this.dateHandler()
    this.isLoginMethod()
  }
}
</script>

<style scoped>
    /*.header .logo {*/
    /*    width: 120px;*/
    /*    height: 30px;*/
    /*    background: rgba(255, 255, 255, 0.2);*/
    /*    margin-top: 10%;*/
    /*    float: left;*/
    /*}*/
</style>