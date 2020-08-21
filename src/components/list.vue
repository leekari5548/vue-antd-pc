<template>
  <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <a-avatar slot="avatar" src="http://39.96.204.153:19000/vue-source/1-2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=litao%2F20200819%2F%2Fs3%2Faws4_request&X-Amz-Date=20200819T001439Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=e319de5699d9104dd0af15959d6707b32a7f3f2a84695c5d1ac608042214e5c9"/>
        <a slot="title">{{ item.typeName }}</a>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import Vue from 'vue';
export default {
  name:'list',
  data() {
    return {
      data:[],
    };
  },
  methods:{
    initList(){
      Vue.axios.post("http://localhost:8080/type/all").then(res => {
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