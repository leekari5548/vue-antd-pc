<template>
  <div>
    <a-row>
      <a-col :span="4">
        &nbsp;
      </a-col>
      <a-col :span="16">
        <div style="margin-top: 5%">
          <a-card title="轮播图管理" :bordered="true" >
            <div style="float: right" v-show="data.length < 5">
              <a-upload
                  name="file"
                  :multiple="true"
                  :action="uploadUrl"
                  :headers="headers"
                  @change="handleChange"
              >
                <a-button > <a-icon type="upload" /> 点击上传 </a-button>
              </a-upload>
            </div>
            <br/>
            <br/>
            <br/>

            <a-table :columns="columns" :data-source="data" bordered :pagination="false">
              <template
                  v-for="col in ['name', 'age', 'address']"
                  :slot="col"
                  slot-scope="text, record, index"
              >
                    {{ text }}
              </template>
              <template slot="operation" slot-scope="text, record, index">
                <a @click="() => showModal(record.imageUrl)">预览</a>
                <a-modal v-model="visible" title="Modal" ok-text="确认" cancel-text="取消" width="888px" height="700px" @ok="hideModal">
                  <div>
                    <img :src="currentImageUrl" style="object-fit: cover;width:100%;height: 300px"/>
                  </div>

                </a-modal>
                &nbsp;&nbsp;
<!--                <a @click="() => deleteCarousel(record.key)">编辑</a>-->
                &nbsp;&nbsp;
                <a @click="() => deleteCarousel(record.id)">删除</a>
              </template>
            </a-table>
          </a-card>
        </div>
      </a-col>
      <a-col :span="4">
        &nbsp;
      </a-col>
    </a-row>
  </div>
</template>

<script>
import baseUrl from "../../utils/baseUrl";
import qs from "qs";

const columns = [
  {
    title: '操作人',
    dataIndex: 'createUser',
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: '15%',
    scopedSlots: { customRender: 'age' },
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    width: '40%',
    scopedSlots: { customRender: 'address' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
// const uploadUrl = `${baseUrl}/carousel/upload`
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export default {
name: "ResourceManager",
  data() {
    // this.cacheData = data.map(item => ({ item }));
    return {
      headers: {
        userId: '',
        token:''
      },
      uploadUrl: `${baseUrl}/carousel/upload`,
      data:[],
      columns,
      visible: false,
      currentImageUrl: '',
      currentImageId: '',
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.response === '' || info.file.response === undefined) {
        // this.$message.success(`系统错误`);
      }else if (info.file.response.code === 0) {
        this.$message.success(`${info.file.name} file uploaded successfully`);
        this.initCarousel()
      } else if (info.file.response.code !== 0) {
        this.$message.error(info.file.response.message);
      }
    },
    hideModal() {
      this.visible = false;
      this.currentImageUrl = ''
    },
    showModal(image) {
      this.currentImageUrl = image
      this.visible = true;
    },
    // edit(){},
    // handleChange(value, key, column) {
    //   const newData = [...this.data];
    //   const target = newData.filter(item => key === item.key)[0];
    //   if (target) {
    //     target[column] = value;
    //     this.data = newData;
    //   }
    // },
    deleteCarousel(key) {
      console.log(key)
      if (key === '' || key === undefined) {
        this.$message.error('系统错误')
        return
      }
      let param = {
        ids: key + ','
      }
      this.axios.post(`${baseUrl}/carousel/delete`,qs.stringify(param)).then(res => {
        if (res.data.code === 0) {
          this.$message.success('删除成功')
          this.initCarousel()
        }else {
          this.$message.warn(res.data.message)
        }
      }).catch(e => {
        this.$message.error('系统错误')
        console.log(e)
      })
    },
    initCarousel(){
      let param = {
        type: 2
      }
      this.axios.post(`${baseUrl}/carousel/list/manage`,qs.stringify(param)).then(res => {
        let list = res.data.data.list
        if (res.data.code === 0) {
          this.data = []
          for (let i = 0; i < list.length; i++) {
            list[i].imageUrl = `${baseUrl}${list[i].imageUrl}`
            this.data.push(list[i])
          }
          this.show = false
        }
      })
    }
  },
  beforeMount() {
  this.headers.userId = this.$session.get('userId')
    this.headers.token = this.$session.get('token')
    this.initCarousel()
  }
}
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>