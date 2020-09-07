<template>
  <a-card>
<!--    :loading="loading"-->
    <a-list
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="blogList"
    >
<!--      <div-->
<!--          v-if="showLoadingMore"-->
<!--          slot="loadMore"-->
<!--          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"-->
<!--      >-->
<!--        <a-spin v-if="loadingMore" />-->
<!--        <a-button type="primary"  v-else @click="onLoadMore">-->
<!--          more-->
<!--        </a-button>-->
<!--      </div>-->
      <a-list-item slot="renderItem" slot-scope="item">
        <a @click="skipTo(item.id)">
        <a-list-item-meta
            :description="item.title"
        >
          <a slot="title">{{ item.createUser }}</a>
          <a-avatar
              slot="avatar"
              :src="item.createUserImageUrl"
          />
        </a-list-item-meta>
        </a>
        <template slot="actions">
        <span key="star">
          <a-icon type="star" style="margin-right: 8px" />
          {{ item.stars }}
        </span>
          <span key="like">
          <a-icon type="like" style="margin-right: 8px" />
          {{ item.likes }}
        </span>
          <span key="eye">
          <a-icon type="eye" style="margin-right: 8px" />
          {{ item.views }}
        </span>
        </template>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script>
import baseUrl from "../utils/baseUrl";
import * as qs from "qs";

export default {
  data() {
    return {
      currentUser:'',
      blogList:[]
    };
  },
  methods: {
    skipTo(id){
      this.$router.push({name: 'blogDetail', query: {id: id}})
    },
    getBlogList(){
      this.currentUser = this.$session.get('userId')
      this.axios.post(`${baseUrl}/blog/most/popular`).then(res => {
        if (res.data.code === 0) {
          let list = res.data.data.list
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
  },
  beforeMount() {
    this.getBlogList()
  }
};
</script>
<style scoped>
</style>
