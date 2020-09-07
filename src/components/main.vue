<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout>

      <main-header @btn-change="getChange"/>
      <center-content />
      <main-footer/>
      <a-back-top />

    </a-layout>
  </a-layout>
</template>
<script>
import MainHeader from "./MainHeader";
import MainMenu from "./MainMenu";
import MainContent from "./MainContent";
import MainFooter from "./MainFooter";
import CenterContent from "./centerContent";
import LeekariMenu from "./leekariMenu"
export default {
  components: {CenterContent, MainFooter, MainContent, MainMenu, MainHeader,LeekariMenu},
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

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
