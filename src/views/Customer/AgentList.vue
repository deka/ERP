<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="getemplist.agentname" :placeholder="$t('Customer.agentname')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.phone" :placeholder="$t('Customer.phone')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('Customer.customertype')" size="small" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in customertypes"
          :key="index"
          :value="item.id"
          :label="item.categoryName"/>
      </el-select>

      <el-popover
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-select v-model="getemplist.source" :value="getemplist.source" :placeholder="$t('Customer.source')" size="small" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option
            v-for="(item, index) in sources"
            :key="index"
            :value="item.id"
            :label="item.categoryName"/>
        </el-select>
        <el-input v-model="getemplist.contactname" :placeholder="$t('Customer.contactname')" size="small" style="width: 40%;float: right;margin-right: 20px" clearable />
        <el-input v-model="getemplist.pinyin" :placeholder="$t('Customer.pinyin')" size="small" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" clearable />
        <el-select v-model="getemplist.level" :value="getemplist.level" :placeholder="$t('Customer.level')" size="small" style="width: 40%;float: right;margin-right: 20px;margin-top: 20px" clearable>
          <el-option
            v-for="(item, index) in levels"
            :key="index"
            :value="item.id"
            :label="item.categoryName"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" size="small" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card :body-style="	{ padding: '6px'}" class="box-card" shadow="never">
      <el-dropdown @command="handleCommand">
        <el-button v-waves size="small" class="filter-item2" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-14-18-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-14-18-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 60px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-14-18-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 60px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-14-18-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 60px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('Customer.id')" :resizable="false" fixed="left" align="center" width="60">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.id }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="edtiForm" :detailid.sync="detailid"/>
        </el-table-column>
        <el-table-column :label="$t('Customer.agentname')" :resizable="false" fixed="left" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.agentName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.customertype')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.agentType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.level')" :resizable="false" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.agentLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.traderid')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.traderName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.contactname')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.contactName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.phone')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.createName')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.createTime')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button v-permission="['1-14-18-3']" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <!--            <el-button v-permission2="['1-14-18-2', scope.row.createPersonId]" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :control.sync="editVisible" :editdata.sync="customerForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { searchCusCategory, agentlist, deleteagent } from '@/api/Customer'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyDialog from './components/MyDialog'
import DetailList from './components/DetailList'

var _that
export default {
  name: 'AgentList',
  directives: { waves, permission, permission2 },
  components: { DetailList, Pagination, MyDialog },
  data() {
    return {
      tableHeight: 200,
      // 详情数据
      edtiForm: {},
      // 详情传递id
      detailid: null,
      // 详情组件数据
      detailvisible: false,
      // 批量操作
      moreaction: [],
      // 控制修改数据
      editVisible: false,
      // 所有客户类型数据
      // 发送参数
      customertypes: [],
      customertyp: 1,
      // 优质级别类型所有数据
      // 发送参数
      levels: [],
      levelstype: 2,
      // 客户来源所有数据
      // 发送参数
      sources: [],
      sourcestype: 3,
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
      // 客户列表查询加展示参数
      getemplist: {
        agentname: '',
        phone: '',
        type: '',
        pinyin: '',
        level: '',
        pagenum: 1,
        pagesize: 10,
        contactname: '',
        source: '',
        createtime: ''
      },
      // 客户信息数据
      customerForm: {
        agentname: '',
        phone: '',
        type: '',
        pinyin: '',
        level: '',
        source: '',
        discount: '',
        countryid: '',
        provinceid: '',
        cityid: '',
        introduce: '',
        address: '',
        contactname: '',
        traderid: '',
        transmode: '',
        deliverymode: '',
        createid: '',
        newold: ''
      }
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
    this.getCategory()
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
    // 详情操作
    handleDetail(row) {
      this.detailid = row.id
      this.detailvisible = true
      this.edtiForm = Object.assign({}, row)
    },
    // 获取类型
    getCategory() {
      // 获取客户类型
      searchCusCategory(this.customertyp).then(res => {
        if (res.data.ret === 200) {
          this.customertypes = res.data.data.content.list
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
      // 获取客户优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
      // 获取客户来源
      searchCusCategory(this.sourcestype).then(res => {
        if (res.data.ret === 200) {
          this.sources = res.data.data.content.list
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    getlist() {
      // 员工列表数据
      this.listLoading = true
      agentlist(this.getemplist).then(res => {
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
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      agentlist(this.getemplist).then(res => {
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
    // 新增数据
    handleAdd() {
      this.$router.push('/Customer/NewAgent')
    },
    // 生成合同
    handleContract() {
      console.log(123)
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编号', '工号', '员工登陆账号', '姓名', '性别', '生日', '邮箱', '职位', '所属部门', '所属区域', '所属门店', '入职时间', '离职时间', '状态']
          const filterVal = ['id', 'jobNumber', 'account', 'firstName', 'gender', 'birthday', 'email', 'postName', 'deptName', 'regionName', 'repositoryName', 'createTime', 'dimissionTime', 'stat']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '员工资料表'
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
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteagent(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: this.$t('prompt.sccg'),
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'wrong',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('prompt.yqxsc')
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteagent(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'wrong',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('prompt.yqxsc')
        })
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log('修改', row)
      this.editVisible = true
      this.customerForm = Object.assign({}, row)
      console.log(this.customerForm)
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
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
