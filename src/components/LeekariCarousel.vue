<template>
  <a-carousel  effect="fade" autoplay>
    <div v-for="item in data" :key="item.id">
      <img :src="item.imageUrl" width="100%" height="50%"/>
    </div>
  </a-carousel>
</template>
<script>
import Vue from 'vue'
import qs from 'qs'
const baseUrl = 'http://localhost:8080'
export default {
  name: "LeekariCarousel",
  data(){
    return{
      data:[]
    }
  },
  methods:{
    initCarousel(){
      let param = {
        type: 2
      }
      Vue.axios.post(`${baseUrl}/carousel/list`,qs.stringify(param)).then(res => {
        let list = res.data.data.list
        for (let i = 0; i < list.length; i++) {
          list[i].imageUrl = `${baseUrl}${list[i].imageUrl}`
          this.data.push(list[i])
        }
      })
    }
  },
  beforeMount() {
    this.initCarousel()
  }
}
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
