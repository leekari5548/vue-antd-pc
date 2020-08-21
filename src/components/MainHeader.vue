<template>
    <a-layout-header class="header">
      <a-row v-if="isLogin">
        <a-col :span="23">
          <a-menu
              style="margin-left: 95%"
              theme="dark"
              mode="horizontal"
              :style="{ lineHeight: '64px' }"
          >
<!--            <a-menu-item  key="1">-->
<!--              管理-->
<!--            </a-menu-item>-->
<!--            <a-menu-item key="2">-->
<!--              信息-->
<!--            </a-menu-item>-->
          </a-menu>
        </a-col>
        <a-col :span="1">
          <a-dropdown :trigger="['hover']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <span style="margin-left: 80%">
                <a-badge :count="1"><a-avatar shape="square" src="http://localhost:8080/file/download/fe180f52cb9b4212ae067fc199d3e77f"/></a-badge>
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
              <a-menu-item key="h-4">
                <a @click="changeMethod('h-4')">管理员入口</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="h-5">
                <a @click="changeMethod('h-5')">
                  退出
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

        </a-col>
      </a-row>
      <a-menu
          v-if="!isLogin"
          style="margin-left: 90%"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="h-6">
          <a @click="changeMethod('h-6')">
            登录
          </a>
        </a-menu-item>
        <a-menu-item key="h-7">
          <a @click="changeMethod('h-7')">
          注册
          </a>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
</template>

<script>
export default {
  name: "MainHeader",
  data(){
    return{
        isLogin: false,
        active: ''
    }
  },
  methods:{
    isLoginMethod(){
      let userinfo = this.$session.get('userinfo')
      if (userinfo !== '') {
        this.isLogin = false
      }else
        this.isLogin = true
    },
    changeMethod(btn){
        this.active = btn
      this.$emit('btn-change',btn)
    }
  },
  beforeMount() {
    this.isLoginMethod()
  }
}
</script>

<style scoped>
    .header .logo {
        width: 120px;
        height: 30px;
        background: rgba(0, 0, 0, 0.2);
        margin-top: 10%;
        float: left;
    }
</style>