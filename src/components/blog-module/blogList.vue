<template>
  <div style="margin: 2%">
    <a-row>
      <a-col :span="18">
        <a-button type="primary" icon="edit" @click="writePaper">
          写文章
        </a-button>
        <a-input-search placeholder="搜索" v-model="search" style="width:20%;float: right;margin-right: 10%" @search="onSearch"  />
        <div style="margin: 5%">
          <a-list item-layout="vertical" size="large" :data-source="blogList">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
              <template slot="actions">
                <span key="star">
                <a-icon :theme="'twoTone'" @click="star(item.id)" type="star" />
                {{item.stars}}
                </span>
                <span key="like">
                <a-icon :theme="'twoTone'" type="like" @click="like(item.id)"  />
                {{item.likes}}
                </span>
                <span key="eye">
                <a-icon :theme="'twoTone'" type="eye"/>
                {{item.views}}
                </span>
                <span v-if="currentUser === item.createUserId" key="edit">
                <a-icon :theme="'twoTone'" @click="toEdit(item.id)" type="edit" />
                </span>
                <span v-if="currentUser === item.createUserId" key="delete">
                <a-icon type="delete"  />
                </span>
              </template>
              <a-list-item-meta @click="skipTo(item.id)" :description="item.description">
                <a slot="title" :href="item.href">{{ item.title }}</a>
                <a-avatar slot="avatar" :src="item.createUserImageUrl" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div align="center">
          <a-pagination :default-current="currentPage" :total="total" @change="onChange" />
        </div>
      </a-col>
      <a-col :span="1">&nbsp;</a-col>
      <a-col :span="5">
        <a-card hoverable style="width: 240px" v-for="i in 5" :key="i">
          <img
              slot="cover"
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
          <a-card-meta title="Europe Street beat">
            <template slot="description">
              www.instagram.com
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import baseUrl from "../../utils/baseUrl";
import * as qs from "qs";


export default {
  name:'blogList',
  data() {
    return {
      search:'',
      blogList:[],
      total: 0,
      currentPage: 1,
      currentUser:'',
      pageSize: 15
    };
  },
  methods:{
    star(id){
      // this.clickTargetButton(1, id)
    },
    like(id){
      this.clickTargetButton(0, id)
      for (let i = 0; i < this.blogList.length; i++) {
        if (this.blogList[i].id === id) {
          this.blogList[i].likes = this.blogList[i].likes + 1
        }
      }
    },
    clickTargetButton(type, id){
      let param = {
        type: type,
        id: id,
        contentType: 0
      }
      this.axios.post(`${baseUrl}/statistics/click`,qs.stringify(param)).then(res => {
        if (res.data.code === 0){

        }else {
          this.$message.warning(res.data.message)
        }
      }).catch(e => {
        this.$message.error('系统错误')
      })
    },
    onChange(pageNumber) {
      this.currentPage = pageNumber
      this.getBlogList(this.search)
    },
    skipTo(id){
      this.$router.push({name: 'blogDetail', query: {id: id}})
    },
    writePaper(){
      let userId = this.$session.get('userId')
      let token = this.$session.get('token')
      let isLogin = (userId === undefined || userId === '') &&
          (token === undefined || token === '')
      if (isLogin) {
        this.$message.warning('请先登录')
      }else {
        this.$router.push('/blog/new')
      }
    },
    getBlogList(search){
      this.currentUser = this.$session.get('userId')
      if (!search){
        search = ''
      }
      let param = {
        title:search,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }
      this.axios.post(`${baseUrl}/blog/list`,qs.stringify(param)).then(res => {
        if (res.data.code === 0) {
          let list = res.data.data.list
          this.blogList = []
          for (let i = 0; i < list.length; i++) {
            list[i].createUserImageUrl = `${baseUrl}${list[i].createUserImageUrl}`
            this.blogList.push(list[i])
          }
          this.total = res.data.data.total
        }else {
          this.$message.warning(res.data.message)
        }
      })
    },
    toEdit(id){
      this.$router.push({name: 'newBlog', query: {id: id}})
    },
    onSearch(){
      this.currentPage = 1
      this.getBlogList(this.search)
    },
  },
  beforeMount() {
    this.getBlogList()
  }
};
</script>
<style></style>
