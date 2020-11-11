<template>
<div>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="进制转换"
      sub-title="数字进制转换"
  />
  <a-form-model layout="inline">
    <a-form-model-item label="进制">
      <a-select :default-value="10" style="width: 120px"  @change="handleChange">
          <a-select-option :value="i" v-for="i in conversionNumberSetting" :key="i">
            {{i}}
          </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-item>
      <a-input placeholder="请输入要转换的数字" allow-clear :value="inputNumber" @change="handleNumberChange" />
    </a-form-item>
    <a-form-item>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button type="primary" @click="conversionNumber">
          转换
        </a-button>
      </a-config-provider>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button @click="clear">
          清空
        </a-button>
      </a-config-provider>
    </a-form-item>
  </a-form-model>
  <a-list item-layout="horizontal" :data-source="conversionNumberResult">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta>
        <span slot="title">{{ item.key }}进制：{{item.value}}</span>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</div>
</template>

<script>
import baseUrl from "../../utils/baseUrl";
import qs from 'qs'
export default {
name: "conversionNumber",
  data() {
    return {
      inputNumber: '',
      conversionArg: 10,
      inputValue: 10,
      conversionNumberSetting: [2, 8, 10, 16],
      conversionNumberResult: [{key:2,value:''},{key: 8,value: ''},{key: 10,value: ''},{key: 16,value: ''}],
      routes: [
        {
          path: 'index',
          breadcrumbName: 'First-level Menu',
        },
        {
          path: 'first',
          breadcrumbName: 'Second-level Menu',
        },
        {
          path: 'second',
          breadcrumbName: 'Third-level Menu',
        },
      ],
    };
  },
  methods: {
    clear(){
      this.inputValue = 10
      this.inputNumber = ''
      this.conversionNumberResult = [{key:2,value:''},{key: 8,value: ''},{key: 10,value: ''},{key: 16,value: ''}]
    },
    handleNumberChange(e) {
      this.inputNumber = e.target.value;
    },
    handleChange(value) {
      this.conversionArg = value
    },
    conversionNumber(){
      console.log(this.inputNumber)
      let request = {
        conversionArg: this.conversionArg,
        number: this.inputNumber
      }
      this.axios.post(`${baseUrl}/tools/conversionNumber`, qs.stringify(request)).then((data) => {
        if (data.data.code === 0) {
          let result = data.data.data

          this.conversionNumberResult = []
          this.conversionNumberResult.push({key: 2, value: result.bin})
          this.conversionNumberResult.push({key: 8, value: result.oct})
          this.conversionNumberResult.push({key: 10, value: result.ten})
          this.conversionNumberResult.push({key: 16, value: result.oxx})
          console.log(result)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
}
</script>

<style scoped>

</style>