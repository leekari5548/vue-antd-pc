<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <main-menu/>
    <a-layout>
      <main-header @btn-change="getChange"/>
      <main-content :changeBtn="active"/>
      <main-footer/>
      <a-back-top />
    </a-layout>
  </a-layout>
</template>
<script>
import MainHeader from "@/components/MainHeader";
import MainMenu from "@/components/MainMenu";
import MainContent from "@/components/MainContent";
import MainFooter from "@/components/MainFooter";
export default {
  components: {MainFooter, MainContent, MainMenu, MainHeader},
  data() {
    return {
      collapsed: false,
      active: ''
    };
  },
  methods:{
    getChange(btn){
      this.active = btn
    }
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
