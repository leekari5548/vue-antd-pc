<template>
  <div>
    <a-layout-content style="margin: 0 16px">
      <br/>
      <a-row>
        <a-col :span="5">
          <list/>
        </a-col>
        <a-col :span="18">
          <leekari-carousel/>
          <a-divider/>
          <a-card :bordered="false" title="本站公告">
              {{'公告'}}
          </a-card>
          <br/>
          <content-list/>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
</template>

<script>
import baseUrl from '../utils/baseUrl'
import LeekariCarousel from "./LeekariCarousel";
import List from "./list";
import ContentList from "./contentList";
import Register from "./register";
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