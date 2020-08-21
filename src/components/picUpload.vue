<template>
  <div class="clearfix">
    <a-upload
        action="http://localhost:8080/file/upload/avatar"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader)
      console.log(reader.result)
      resolve(reader.result);
    }
    reader.onerror = error =>{
      reject(error);
    }
  });
}
let baseUrl = 'http://localhost:8080'
export default {
  name:'picUpload',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      avatarUrl:'',
      fileList: [],
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      // console.log(file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      if (file.response.data.avatarUrl !== undefined && file.response.data.avatarUrl !== ''){
        // console.log(this.avatarUrl)
        this.previewImage = `${baseUrl}${file.response.data.avatarUrl}`;
      }else {
        this.previewImage = file.preview || file.thumbUrl
      }
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      let file = fileList[0]
      if (file.response !== undefined) {
        this.avatarUrl = file.response.data.avatarUrl
        this.$emit("sendAvatarUrl", this.avatarUrl)
      }

    },
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
