<template>
  <div>
    <div>
      <a-card title="Default size card">
        <markdown-it-vue class="md-body" :content="content"/>
      </a-card>
    </div>

  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
  name:'leekariMarkdown',
  components: {
    MarkdownItVue
  },
  data () {
    return {
      content: '# your markdown content \n ## 二级标题\n```java class ```'
    }
  }
}
</script>