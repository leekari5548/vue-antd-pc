<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="文章详情"
        sub-title="article detail"
        @back="goBack"
    />
    <div style="margin: 2%">
      <a-card :title="data.title">
        <div style="margin: 2%">
          <span v-for="item in data.tags" :key="item.id">
            <a-tag color="cyan">
              {{ item.tagName }}
            </a-tag>
          </span>

        </div>

        <mavon-editor
            v-show="showMd"
            class="md"
            :value="content"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
        ></mavon-editor>
      </a-card>
    </div>
    <div  style="margin-right: 5%;margin-left: 5%">
      <leekari-new-comment @showMd="handlerShowMd" :itemId="data.id"/>
    </div>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import LeekariMarkdown from "../md/LeekariMarkdown";
import baseUrl from "../../utils/baseUrl";
import * as qs from "qs";
import LeekariComment from "../LeekariComment";
import LeekariNewComment from "../LeekariNewComment";
export default {
  name: "blogDetail",
  components: {LeekariNewComment, LeekariComment, LeekariMarkdown,mavonEditor},
  data(){
    return{
      data:'',
      id:'',
      content: '',
      isLogin: false,
      showMd: true
    }
  },
  methods: {
    handlerShowMd(e){
      this.showMd = e
    },
    goBack() {
      this.$router.go(-1)
    },
    initBlogDetail(){
      let userId = this.$session.get('userId')
      if (userId !== undefined || userId !== '') {
        this.isLogin = true
      }
      this.id = this.$route.query.id
      let param = {
        id: this.id
      }
      this.axios.post(`${baseUrl}/blog/detail`, qs.stringify(param)).then(res => {
        if (res.data.code === 0) {
          this.data = res.data.data
          this.content = this.data.mdContent.toString()
          console.log(this.data)
        }else {
          this.$message.warning(res.data.message)
        }
      }).catch(e => {
        this.$message.error('系统错误')
      })
    }
  },
  beforeMount() {
    this.initBlogDetail()
  }
}
</script>

<style scoped>

</style>