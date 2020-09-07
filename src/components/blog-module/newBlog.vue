<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="pageTitle"
        :sub-title="pageSubTitle"
        @back="goBack"
    />
    <div style="margin: 5%">
      <a-card>
        <a-form align="center" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="标题">
            <a-input placeholder="请输入标题" type="text" v-model="title" :maxLength="50" allow-clear />
          </a-form-item>
        </a-form>

        <div style="margin-top: 1%;margin-bottom: 1%">

          <mavon-editor
              :help="'false'"
              v-model="content"
              ref="md"
              :ishljs = "true"
              @change="change"
              style="min-height: 600px"
              @imgAdd="imgAdd"
              @imgDel="imgDel"
          />
        </div>

        <div style="margin-left: 2%">
          <template v-for="(tag, index) in tags">
            <a-tag :key="tag" color="cyan" closable @close="() => handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
              v-if="inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              :value="inputValue"
              @change="handleInputChange"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else v-show="tags.length < 5" style="background: #fff; borderStyle: dashed;" @click="showInput">
            <a-icon type="plus" /> 新增标签
          </a-tag>
        </div>

        <div align="center">
          <a-button @click="submit" type="primary">
            提交
          </a-button>
          <a-button @click="save" type="primary">
            保存
          </a-button>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import baseUrl from "../../utils/baseUrl";
import * as qs from "qs";

export default {
name: "newBlog",
  data(){
  return{
    pageTitle:'新建文章',
    pageSubTitle:'new article',
    title:'',
    tags: [],
    inputVisible: false,
    inputValue: '',
    dataSource: [],
    content:'', // 输入的markdown
    html:'',    // 及时转的html
    isNew: true
  }
  },
  components:{mavonEditor},
  methods:{
    imgAdd(pos, $file){
      let _this = this;
      // 第一步.将图片上传到服务器.
      let formData = new FormData();
      formData.append('file', $file);
      formData.append('sourceCode', 0)
      this.axios({
        url: `${baseUrl}/file/upload`,
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(res => {
        if (res.data.code === 0) {
          let url = res.data.data.fileId
          url = `${baseUrl}${url}`
          this.$refs.md.$img2Url(pos, url)
        }
      })
    },
    imgDel(pos){

    },
    save(){
      let tagName = ''
      this.tags.map(value => {tagName = tagName + value + ','})
      console.log(tagName)
    },
    submit(){
      if (this.title === '') {
        this.$message.warning('请填写标题')
        return
      }
      if (this.html === '' || this.content === '') {
        this.$message.warning('请填写正文')
        return
      }
      let tagName = ''
      this.tags.map(value => {tagName = tagName + value + ','})
      let params = {
        tags: tagName,
        htmlContent: this.html,
        mdContent: this.content,
        articleTitle: this.title
      }
      let token = this.$session.get('token')
      let userId = this.$session.get('userId')
      if (this.isNew) {
        this.axios.post(`${baseUrl}/blog/add`,qs.stringify(params),{
          headers:{
            token: token,
            userId: userId
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.$message.success('提交成功')
            this.$router.go(-1)
          }else {
            this.$message.warning(res.data.message)
          }
        }).catch(e => {
          this.$message.error("系统错误")
        })
      }else {
        params.id = this.$route.query.id
        console.log(params)
        this.axios.post(`${baseUrl}/blog/edit`,qs.stringify(params),{
          headers:{
            token: token,
            userId: userId
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.$message.success('提交成功')
            this.$router.go(-1)
          }else {
            this.$message.warning(res.data.message)
          }
        }).catch(e => {
          this.$message.error("系统错误")
        })
      }
    },
    change(value, render){
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    onSearch(searchText) {
      this.dataSource = !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)];
    },
    onSelect(value) {
      console.log('onSelect', value);
    },
    goBack(){
      this.$router.go(-1)
    },
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      this.tags = tags;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    init(){
      let id = this.$route.query.id
      if (id) {
        this.isNew = false
        this.pageTitle = '编辑文章'
        this.pageSubTitle = 'edit article'
        let param = {
          id: id
        }
        this.axios.post(`${baseUrl}/blog/detail`, qs.stringify(param)).then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            this.content = data.mdContent.toString()
            this.title = data.title
            let tags = data.tags
            tags.map(value => {this.tags.push(value.tagName)})
          }else {
            this.$message.warning(res.data.message)
          }
        }).catch(e => {
          console.log(e)
          this.$message.error('系统错误')
        })
      }
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (tags.includes(inputValue)){
        this.$message.warning('请不要重复添加标签')
        return
      }
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    },
  },
  beforeMount() {
    this.init()
  }
}
</script>

<style scoped>

</style>