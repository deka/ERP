<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="searchRepositoryId" :placeholder="$t('StockAlarm.searchRepositoryId')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>

      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px; margin-top: 10px" @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 表格导出操作 -->
      <el-button v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item2" size="small" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.searchRepositoryId')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.code')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.productName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('inventoryAlarm.content')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { alarmList } from '@/api/InventoryAlarm'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyCreate from './components/MyCreate'

var _that
export default {
  name: 'InventoryAlarmList',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyRepository, MyAccept, MyCreate },
  filters: {
    flagStatFileter(status) {
      const statusMap = {
        1: '下限预警',
        2: '上线预警'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 搜索数据----------------------
      // 部门数据
      depts: [],
      // 仓库回显
      searchRepositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 开始时间到结束时间
      date: [],
      // 预警列表传参数据
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        countryId: this.$store.getters.countryId,
        regionIds: this.$store.getters.regionIds
      },
      // 搜索结束 ----------------------
      // 列表操作 -------------------------
      // 批量操作
      moreaction: '',
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true
    }
  },
  activated() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    checkPermission,
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.searchRepositoryId = val.repositoryName
      this.getemplist.repositoryId = val.id
    },
    getlist() {
      // 预警列表数据
      this.listLoading = true
      alarmList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.listLoading = false
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.searchRepositoryId = ''
      this.getemplist.searchRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      alarmList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StockAlarmName', 'StockAlarmShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '经销商资料表'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    // 打印
    handlePrint() {
      console.log(456)
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .filter-container >>> .el-form-item__label{
    padding: 0;
  }
  .ERP-container {
    margin-left:10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 10px;
    padding: 10px 0;
  }
  .filter-item2{
    width: 180px;
    margin-left: 5px;
    padding: 10px 0;
  }
  .box-card {
    /* border : 1px solid #f1f1ff !important; */
    border-bottom : 1px solid #f1f1ff00 !important
  }
</style>
