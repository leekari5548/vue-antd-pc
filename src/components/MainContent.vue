<template>
  <div>
  <div v-if="activate === ''">
    <a-layout-content style="margin: 0 16px">
      <br/>
      <leekari-carousel/>
      <a-row>
        <a-col :span="5">
          <list/>
        </a-col>
        <a-col :span="1">
          <div style="background: aqua"></div>
        </a-col>
        <a-col :span="18">
          <content-list/>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
  <div v-if="activate === 'h-7'">
    <register/>
  </div>
  </div>
</template>

<script>
import LeekariCarousel from "@/components/LeekariCarousel";
import List from "@/components/list";
import ContentList from "@/components/contentList";
import Register from "@/components/register";
export default {
  name: "MainContent",
  data(){
    return{
      activate: ''
    }
  },
  watch:{
    changeBtn(newVal) {
      this.activate = newVal
      console.log(this.activate)
    }
  },
  components: {Register, ContentList, List, LeekariCarousel},
  props:['changeBtn'],
}
</script>

<style scoped>

</style>