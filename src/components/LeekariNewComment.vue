<template>
  <div>
    <a-comment v-if="login">
      <a-avatar
          slot="avatar"
          :src="userinfo.picture"
          :alt="userinfo.nickname"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-list
        v-if="total > 0"
        class="comment-list"
        :header="`${total} 条评论`"
        item-layout="horizontal"
        :data-source="comments"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment :author="item.fromUserNickname" :avatar="item.fromUserAvatar">
          <template slot="actions">
            <span @click="showModal(item)">回复</span>
          </template>
          <div v-if="visible && item.id === currentComment.id">
            <a-divider/>
            <a-comment>
              <a-avatar
                  slot="avatar"
                  :src="userinfo.picture"
                  :alt="userinfo.nickname"
              />
              <div slot="content">
                <a-form-item>
<!--                  <a-mentions :rows="4" :cols="50" v-model="reply" :loading="loading" @search="onSearch">-->
<!--                    <a-mentions-option-->
<!--                        v-for="({ login, avatar_url: avatar }) in users"-->
<!--                        :key="login"-->
<!--                        :value="login"-->
<!--                    >-->
<!--                      <img :src="avatar" :alt="login" style="width: 20px; margin-right: 8px;">-->
<!--                      <span>{{ login }}</span>-->
<!--                    </a-mentions-option>-->
<!--                  </a-mentions>-->
                  <a-textarea :rows="4" :value="reply" @change="handleChange1" />
                </a-form-item>
                <a-form-item>
                  <a-button-group size="small">
                    <a-button html-type="submit" :loading="replying" type="primary" @click="replyMethod(item.fromUserId)">
                      评论
                    </a-button>
                    <a-button html-type="submit" type="primary" @click="handleCancel">
                      关闭
                    </a-button>
                  </a-button-group>

                </a-form-item>
              </div>
            </a-comment>
          </div>
          <p slot="content">
            {{ item.content }}
          </p>
          <a-tooltip slot="datetime" :title="item.createTime.format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ item.createTime.fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import debounce from 'lodash/debounce';
import moment from 'moment';
import baseUrl from "../utils/baseUrl";
import * as qs from "qs";
import login from "./login";
export default {
  name:'leekariNewComment',
  data() {
    return {
      loading: false,
      users: [],
      reply:'',
      currentComment:'',
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      comments: [],
      submitting: false,
      value: '',
      moment,
      userinfo:'',
      total:0,
      articleId:'',
      login: false,
      replying: false
    }
  },
  mounted() {
    this.loadGithubUsers = debounce(this.loadGithubUsers, 800);
  },
  props:['itemId'],
  methods: {
    onSearch(search) {
      this.search = search;
      this.loading = !!search;
      console.log(!!search);
      this.users = [];
      console.log('Search:', search);
      this.loadGithubUsers(search);
    },
    loadGithubUsers(key) {
      if (!key) {
        this.users = [];
        return;
      }
      fetch(`https://api.github.com/search/users?q=${key}`)
          .then(res => res.json())
          .then(({ items = [] }) => {
            const { search } = this;
            if (search !== key) return;

            this.users = items.slice(0, 10);
            this.loading = false;
          });
    },
    showModal(comment) {
      if (!this.login) {
        this.$message.warning('请先登录')
        return
      }
      this.reply = `回复@${comment.fromUserNickname}：`
      this.visible = true;
      this.currentComment = comment
      this.$emit('showMd', false)
    },
    handleCancel(e) {
      this.visible = false;
      this.reply = ''
    },
    initReview(){
      console.log(this.articleId)
      if (this.articleId === undefined || this.articleId === '') {
        this.$message.warning('获取评论失败')
        return
      }
      this.axios.post(`${baseUrl}/review/list`,qs.stringify({targetId: this.articleId})).then(res => {
        if (res.data.code === 0) {
          let comments = res.data.data.list
          this.total = res.data.data.total
          this.comments = []
          for (let i = 0; i < this.total; i++) {
            comments[i].fromUserAvatar = `${baseUrl}${comments[i].fromUserAvatar}`
            comments[i].createTime = moment(comments[i].createTime, 'YYYY-MM-DD HH:mm:ss')
            // comments[i].toUserAvatar = `${baseUrl}${comments[i].toUserAvatar}`
            this.comments.push(comments[i])
          }
          console.log(this.comments)
        }else {
          this.$message.warning(res.data.message)
        }
      }).catch(e => {
        this.$message.error('系统错误')
      })
    },
    replyMethod(toUserId){
      if (!this.articleId){
        this.$message.warning('系统错误')
        return;
      }
      if (!this.reply) {
        this.$message.warning('请填写评论内容')
        return;
      }
      let userId = this.$session.get('userId')
      let token = this.$session.get('token')
      this.replying = true;
      let param = {
        targetId: this.articleId,
        content: this.reply,
        toUserId: toUserId
      }
      this.axios.post(`${baseUrl}/review/add`,qs.stringify(param),{
        headers:{
          'userId': userId,
          'token': token
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success('评论成功')
          this.initReview()
        }else {
          this.$message.warning(res.data.message)
        }
      }).catch(e => {
        this.$message.error('系统异常')
      })
      this.replying = false;
      setTimeout(() => {
        this.value = '';
        this.visible = false
      }, 1000);
    },
    handleSubmit() {
      if (!this.articleId){
        this.$message.warning('系统错误')
        return;
      }
      if (!this.value) {
        this.$message.warning('请填写评论内容')
        return;
      }
      let userId = this.$session.get('userId')
      let token = this.$session.get('token')
      this.submitting = true;
      let param = {
        targetId: this.articleId,
        content: this.value,
        toUserId: ''
      }
      this.axios.post(`${baseUrl}/review/add`,qs.stringify(param),{
        headers:{
          'userId': userId,
          'token': token
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success('评论成功')
          this.initReview()
        }else {
          this.$message.warning(res.data.message)
        }
      }).catch(e => {
        this.$message.error('系统异常')
      })
      setTimeout(() => {
        this.submitting = false;
        this.value = '';
      }, 1000);
    },
    handleChange1(e){
      this.reply = e.target.value
    },
    handleChange(e) {
      this.value = e.target.value;
    },
    initUser(){
      this.articleId =  this.$route.query.id
      this.userinfo = this.$session.get('userinfo')
      let userId = this.$session.get('userId')
      if (userId !== '' && userId !== undefined) {
        this.login = true
      }
      if (this.userinfo){
        this.userinfo.picture = `${baseUrl}${this.userinfo.picture}`
      }
    }
  },
  beforeMount() {
    this.initUser()
    this.initReview()
    // console.log(this.itemId)
  }
};
</script>