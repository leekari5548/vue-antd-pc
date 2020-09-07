<template>
  <div>
  <a-spin tip="Loading..." v-if="show">
    <div style="width:100%;height: 300px">
    </div>
  </a-spin>
    <a-carousel effect="fade" autoplay v-if="!show">
      <div v-for="item in data" :key="item.id">
        <img :src="item.imageUrl" style="object-fit: cover;width:100%;height: 300px"/>
      </div>
    </a-carousel>
  </div>
</template>
<script>
import qs from 'qs'
import baseUrl from '../utils/baseUrl'
export default {
  name: "LeekariCarousel",
  data(){
    return{
      data:[],
      show:true
    }
  },
  methods:{
    initCarousel(){
      let param = {
        type: 2
      }
      this.axios.post(`${baseUrl}/carousel/list`,qs.stringify(param)).then(res => {
        let list = res.data.data.list
        if (res.data.code === 0) {
          for (let i = 0; i < list.length; i++) {
            list[i].imageUrl = `${baseUrl}${list[i].imageUrl}`
            this.data.push(list[i])
          }
          this.show = false
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
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
