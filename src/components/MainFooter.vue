<template>
    <a-layout-footer style="text-align: center">
      <div style="margin-bottom: 2%;margin-top: 2%">
        <el-row>
          <el-col :span="10">
            &nbsp;
          </el-col>
          <el-col :span="2">
            <a style="color: black">关于leekari</a>
          </el-col>
          <el-col :span="2">
            <a style="color: black">leekari历史</a>
          </el-col>
          <el-col :span="10">
            &nbsp;
          </el-col>
        </el-row>
      </div>

      <div style="text-align: center">
        Leekari ©2020 Created by leekari<br/>
        京ICP备19040940号
      </div>
    </a-layout-footer>
</template>

<script>
    export default {
        name: "MainFooter"
    }
</script>

<style scoped>

</style>