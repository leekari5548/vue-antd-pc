<template>
  <a-layout-sider v-model="collapsed" collapsible>
    <div class="logo" style="background: rgb(3,22,39);width: 10%;height: 5%;margin-left:40% ">
      <span style="font-family: Apple,serif;color: white;font-size: 20px">LEEKARI</span>
    </div>
    <a-menu theme="dark"  mode="inline">


      <a-menu-item :key="item.menuKey" v-for="item in data">
        <a-icon :type="item.icon" />
        <span>{{item.menuName}}</span>
      </a-menu-item>

    </a-menu>
  </a-layout-sider>
</template>

<script>
const baseUrl = 'http://localhost:8080'
import Vue from 'vue';
export default {
  name: "MainMenu",
  data() {
    return {
      collapsed: false,
      data:[]
    }
  },
  methods:{
    initMenu(){
      Vue.axios.post(`${baseUrl}/menu/list`).then(res => {
        this.data = res.data.data.list;
        // console.log(res)
      })
    }
  },
  beforeMount() {
    this.initMenu()
  }
}
</script>

<style scoped>
#components-layout-demo-side .logo {
  /*height: 32px;*/
  /*background: rgba(255, 255, 255, 0.2);*/
  /*margin: 16px;*/
}
</style>