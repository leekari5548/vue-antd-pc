<template>
  <div style="margin: 5%">
    <a-row>
      <a-col :span="6">
          <a-card title="进制转换" style="width: 300px">
            <a slot="extra" href="#" @click="index = 1">选择</a>
            <p>数字进制转换</p>
          </a-card>
          <a-card title="翻译" style="width: 300px">
            <a slot="extra" href="#" @click="index = 2">选择</a>
            <p>翻译</p>
          </a-card>
      </a-col>
      <a-col :span="18">
        <div style="color: #3a8ee6;align-items: center">
          <div v-if="index === 1">
            <conversion-number></conversion-number>
          </div>

        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import conversionNumber from "./conversionNumber";
export default {
name: "toolsIndex",
  data(){
    return{
      index: 0
    }
  },
  components:{conversionNumber}
}
</script>

<style scoped>

</style>