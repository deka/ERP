<template>
  <div class="ERP-container">
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <el-input v-model="getemplist.number" :placeholder="$t('updates.stockrequrenumber')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.categoryId" :placeholder="$t('Hmodule.wpfl')" size="mini" class="filter-item" clearable>
        <el-option :label="$t('otherlanguage.zc')" value="1"/>
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.xhp')" value="4"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
        <el-option :label="$t('otherlanguage.xss')" value="6"/>
        <el-option :label="$t('otherlanguage.pjj')" value="7"/>
        <el-option :label="$t('otherlanguage.hj')" value="8"/>
      </el-select>
      <el-input v-model="getemplist.productName" :placeholder="$t('updates.wlmc')" size="mini" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handleAddproduct"/>
      <my-detail :control.sync="control" @productdata="productdata"/>
      <el-select v-model="getemplist.isPlan" :placeholder="$t('updates.sfysccg')" :value="getemplist.isPlan" size="mini" class="filter-item" clearable>
        <el-option :label="$t('updates.yes')" value="1"/>
        <el-option :label="$t('updates.no')" value="2"/>
      </el-select>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-input v-model="supplierId" placeholder="供应商" size="mini" style="width: 40%;float: right;margin-right: 20px;" clearable @focus="handlechoose" @clear="restFilter4"/>
        <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>

        <el-date-picker
          v-model="date"
          type="daterange"
          size="mini"
          range-separator="-"
          unlink-panels
          start-placeholder="需求日期开始"
          end-placeholder="需求日期结束"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" size="mini" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" size="mini" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" size="mini" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 表格导出操作 -->
      <el-button v-permission="['104-107-6']" v-waves :loading="downloadLoading" size="mini" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['104-107-7']" v-waves class="filter-item" icon="el-icon-printer" size="mini" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-plus" size="mini" style="width: 160px;" @click="handleNumbers">{{ $t('updates.sccgjhd') }}</el-button>
    </el-card>

    <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          fixed="left"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.materialsRequireNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('inventorydetaillist.repositoryName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.productName')" :resizable="false" align="center" fixed="left" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.productCode')" :resizable="false" align="center" fixed="left" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.categoryId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productCategory }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.productType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.color')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.unit')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.requireQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requireQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.inventoryQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.inventoryQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.shouldStockQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shouldStockQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.planedQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.planedQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('stockTrackList.enterQuantity')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.alreadyEnterQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.onStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.planedQuantity - scope.row.alreadyEnterQuantity }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.stockAdvanceday')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockAdvanceday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockRequire.requireDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requireDate }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column :label="$t('StockRequire.isPlan')" :resizable="false" align="center" min-width="150">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ scope.row.isPlaned | isPlanedFilter }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button type="primary" style="width: 107px" @click="handleMyReceipt1(scope.row)"><span style="margin-left: -15px;">生成采购计划单</span></el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { stockrequirelist } from '@/api/StockRequire'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyTree from '../Product/components/MyTree'
import MyDetail from './components/MyDetail'
import DetailList from './components/DetailList' // Secondary package based on el-pagination
import MySupplier from './components/MySupplier'

var _that
export default {
  name: 'StockRequire',
  directives: { waves, permission, permission2 },
  components: { DetailList, MyDetail, MyTree, Pagination, MySupplier },
  filters: {
    isPlanedFilter(status) {
      const statusMap = {
        1: '否',
        2: '是'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      supplierId: '',
      empcontrol: false,
      // 物料名称控制
      control: false,
      // 物品分类回显
      categoryId: '',
      // 控制物品分类
      treecontrol: false,
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
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
      listLoading: true,
      // 采购申请列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  activated() {
    this.getlist()
  },
  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    // 批量生成
    handleNumbers() {
      this.$store.dispatch('getempcontract', this.moreaction)
      this.$router.push('/StockPlan/AddStockPlan')
    },
    handleMyReceipt1(val) {
      console.log(val)
      this.$store.dispatch('getempcontract', val)
      this.$router.push('/StockPlan/AddStockPlan')
    },
    checkPermission,
    // 物料名称focus
    handleAddproduct() {
      this.control = true
    },
    // 物品名称数据
    productdata(val) {
      this.getemplist.productName = val.productName
    },
    // 物品分类focus
    treechoose() {
      this.treecontrol = true
    },
    // 物品分类数据
    tree(val) {
      this.categoryId = val.categoryName
      this.getemplist.categoryId = val.id
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      stockrequirelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      // this.handlePersonId = ''
      // this.getemplist.handlePersonId = ''
      this.categoryId = ''
      this.getemplist.categoryId = ''
    },
    restFilter2() {
      this.workCenterId = ''
      this.getemplist.workCenterId = ''
    },
    restFilter3() {
      this.producePlanNumber = ''
      this.getemplist.producePlanNumber = ''
    },
    restFilter4() {
      this.supplierId = ''
      this.getemplist.supplierId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      if (this.date === null || this.date === '') {
        this.getemplist.beginTime = null
        this.getemplist.endTime = null
      } else {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      stockrequirelist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 详情操作
    handleDetail(row) {
      console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
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
          const filterVal = ['id', 'StockRequireName', 'StockRequireShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
  .ERP-container >>>  .el-form-item__label{
    color: #909399;
    text-align: left;
  }
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 20px;
    padding: 10px 0;
  }
</style>
