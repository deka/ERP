<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.xzmb') }}  </span>
      </div>
      <a href="/static/file/物品资料表.xlsx"><el-button type="primary">{{ $t('updates.xzmb') }}</el-button></a>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.scbg') }}</span>
      </div>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.bgsj') }}</span>
        <el-button style="float: right; padding: 3px 0" type="primary" @click="uploads">{{ $t('updates.drsj') }}</el-button>
      </div>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { manyinsert } from '@/api/Product'

var _that
export default {
  name: 'ManyProduct',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      uploadHead: []
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = ['物料编码', '产品名称', '物品分类', '规格型号', '颜色', '绩效分', '商品积分', '成本价', '零售价', '采购价', '创建者', '创建时间']
      this.uploadHead = results.map(function(item) {
        return {
          code: item.物料编码,
          productName: item.产品名称,
          category: item.物品分类,
          productType: item.规格型号,
          color: item.颜色,
          kpiGrade: item.绩效分,
          point: item.商品积分,
          costPrice: item.成本价,
          saleprice: item.零售价,
          purchasePrice: item.采购价,
          createId: item.创建者,
          createTime: item.创建时间
        }
      })
      console.log(header)
    },
    uploads() {
      manyinsert(JSON.stringify(this.uploadHead)).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .app-container {
    margin-top: 20px;
  }
</style>
