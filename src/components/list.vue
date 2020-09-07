<template>
  <div>
    <div style="margin: 5%">
      <a-card title="分类列表">
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item" align="center">
            <a-list-item-meta>
              <a slot="title">{{ item.typeName }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
    <div style="margin: 5%">
      <a-card title="小工具">
        <a slot="extra" @click="skipToTools">更多</a>
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item" align="center">
            <a-list-item-meta>
              <a slot="title">{{ item.typeName }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
    <div style="margin: 5%">
      <a-card title="热门资源">
        <a slot="extra" @click="skipToResource">更多</a>
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item" align="center">
            <a-list-item-meta>
              <a slot="title">{{ item.typeName }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
    <div style="margin: 5%">
      <a-card title="小游戏">
        <a-list item-layout="horizontal" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item" align="center">
            <a-list-item-meta>
              <a slot="title">{{ item.typeName }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </div>

</template>
<script>
import Vue from 'vue';
import baseUrl from '../utils/baseUrl'
export default {
  name:'list',
  data() {
    return {
      data:[],
    };
  },
  methods:{
    skipToResource(){
      this.$router.push('/resource/index')
    },
    skipToTools(){
      this.$router.push('/tools/index')
    },
    initList(){
      Vue.axios.post(`${baseUrl}/blog/type/list`).then(res => {
        this.data = res.data.data.list
      })
    }
  },
  beforeMount() {
    this.initList()
  }
};
</script>
<style></style>