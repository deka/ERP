<template>
  <el-dialog :visible.sync="repositoryVisible" :repositorycontrol="repositorycontrol" :close-on-press-escape="false" top="10px" title="选择仓库" append-to-body @close="$emit('update:repositorycontrol', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.id" :placeholder="$t('Repository.id')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.repositoryName" :placeholder="$t('Repository.repositoryname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('Repository.type2')" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in types"
          :key="index"
          :value="item.id"
          :label="item.categoryName"
        />
      </el-select>
      <el-select v-model="getemplist.iseffective" :value="getemplist.iseffective" :placeholder="$t('Repository.iseffective')" class="filter-item" clearable>
        <el-option :label="$t('updates.qy')" value="1"/>
        <el-option :label="$t('updates.ty')" value="2"/>
      </el-select>
      <el-cascader
        :options="regions"
        :props="props"
        v-model="getemplistregions"
        :show-all-levels="false"
        :placeholder="$t('Hmodule.xzqy')"
        change-on-select
        filterable
        clearable
        class="filter-item"
      />
      <el-select v-model="getemplist.countyrId" placeholder="请选择国家" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in nations"
          :key="index"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <!-- 列表开始 -->
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :height="tableHeight"
      :key="tableKey"
      :data="list"
      :row-key="getRowKeys"
      size="small"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange">
      <el-table-column
        :reserve-selection="true"
        type="selection"
        align="center"
        width="55"/>
      <el-table-column :label="$t('Repository.id')" :resizable="false" prop="id" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Repository.repositoryname')" :resizable="false" prop="repositoryName" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.repositoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Repository.type2')" :resizable="false" prop="categoryName" align="center" width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Repository.iseffective')" :resizable="false" prop="stat" align="center" width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.stat | iseffectiveFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Repository.managerPeople')" :resizable="false" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.managerName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Repository.regionId')" :resizable="false" prop="regionName" align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.regionName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表结束 -->
    <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-top: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
  </el-dialog>
</template>

<script>
import { regionlist, getcountrylist } from '@/api/public'
import { searchRepCategory, searchRepository2 } from '@/api/Repository'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// eslint-disable-next-line no-unused-vars
var _that
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    iseffectiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    },
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    }
  },
  props: {
    repositorycontrol: {
      type: Boolean,
      default: false
    },
    checkdata: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableHeight: 200,

      getRowKeys(row) {
        return row.id
      },
      issearch: false,
      select_orderId: [],
      select_order_number: [],
      // 批量操作
      moreaction: '',
      // 转化数据
      choosedata: '',
      // 仓库弹窗控制
      repositoryVisible: this.repositorycontrol,
      // 类型列表
      types: [],
      // 国家列表
      nations: [],
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
      // 仓库列表查询加展示参数
      getemplist: {
        repositoryName: '',
        type: '',
        iseffective: '',
        regionId: '',
        countyrId: '',
        id: '',
        stat: 1,
        loginRepositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        pagenum: 1,
        pagesize: 10
      },
      // 部门列表
      depts: [],
      // 区域级联数据转化
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域数据
      regions: [],
      getemplistregions: [],
      getemplistregions0: [],
      checknewarrdata: this.checkdata,
      havecheckedarr: [],
      result: [],
      delearr: [],
      checklistprop: []
    }
  },
  watch: {
    repositorycontrol() {
      this.repositoryVisible = this.repositorycontrol
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection()
      }
      this.result = []
      this.moreaction = []
      this.delearr = []
      this.getlist()
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 180
      }, 100)
    },
    checkdata() {
      this.checknewarrdata = this.checkdata
      console.log('this.checknewarrdata', this.checknewarrdata)
      this.checklistprop = this.checknewarrdata.repositories.map(item => {
        return item.id
      })
    },
    list() {
      console.log('this.list', this.list)
      const needarr = this.list
      this.delearr = this.checknewarrdata.repositories

      console.log('delearr', this.delearr)
      for (const i in needarr) {
        for (const j in this.delearr) {
          if (needarr[i].id === this.delearr[j].id) {
            this.$refs.multipleTable.toggleRowSelection(needarr[i], true)
          }
        }
      }
    },
    moreaction(val, oldval) {
      // console.log('newarr', newarr)
      // console.log('oldval', oldoldval)
      // console.log('this.delearr', this.delearr)
      // const val = this.uniqueArray(newarr, 'id')
      // const oldval = this.uniqueArray(oldoldval, 'id')
      console.log('this.moreaction', this.moreaction)
      console.log('val', val)
      console.log('oldval', oldval)
      console.log('issearch', this.issearch)
      // console.log('result', this.result)
      if (oldval) {
        if (oldval.length > val.length) {
          for (const i in oldval) {
            let flag = false
            for (const j in val) {
              if (oldval[i].id === val[j].id) {
                flag = true
                break
              }
            }
            if (!flag) {
              this.result.push(oldval[i])
            }
          }
        } else if (oldval.length < val.length) {
          for (const i in val) {
            let flag = false
            for (const j in oldval) {
              if (val[i].id === oldval[j].id) {
                flag = true
                break
              }
            }
            if (!flag) {
              for (const z in this.result) {
                if (this.result[z].id === val[i].id) {
                  this.result.splice(z, 1)
                }
              }
            }
          }
        }
      }

      // var arr1 = oldoldval

      // var arr2 = newarr

      // for (var i = arr1.length - 1; i >= 0; i--) {
      //   const a = arr1[i].id
      //   for (var j = arr2.length - 1; j >= 0; j--) {
      //     const b = arr2[j].id
      //     if (a === b) {
      //       arr1.splice(i, 1)
      //       this.result.push(arr1[i])
      //       arr2.splice(j, 1)
      //       break
      //     }
      //   }
      // }

      console.log('this.result====', this.result)

      // console.log('result', this.result)
      for (const i in this.delearr) {
        for (const j in this.result) {
          if (this.delearr[i].id === this.result[j].id) {
            this.delearr.splice(i, 1)
          }
        }
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // memoryChecked() {
    //   console.log('我执行啦')
    //   this.list.forEach((row, index) => {
    //     if (this.checklistprop.includes(row.id)) {
    //       this.$refs.multipleTable.toggleRowSelection(row, true)
    //       // myarr = []
    //       // this.myarr.push(row.id)
    //       // this.flagarr = Array.from(new Set(this.myarr))
    //       // console.log('this.flagarr=====================>', this.flagarr)
    //     } else {
    //       try {
    //         this.$refs.multipleTable.toggleRowSelection(row, false)
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     }
    //   })
    // },
    // 批量操作
    handleSelectionChange(rows) {
      // this.moreaction = rows
      console.log('rows', rows)
      this.moreaction = this.uniqueArray(rows, 'id')
      // this.select_order_number = this.moreaction.length
      // this.select_orderId = []
      // if (rows) {
      //   rows.forEach(row => {
      //     if (row) {
      //       this.select_orderId.push(row.id)
      //     }
      //   })
      // }
    },
    getlist() {
      // 国家列表
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        }
      })
      // 仓库列表数据
      this.listLoading = true
      searchRepository2(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.memoryChecked()
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 仓库类型
      searchRepCategory().then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          this.types = res.data.data.content.list
        }
      })
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      this.getemplist.regionId = this.getemplistregions[this.getemplistregions.length - 1]
      console.log(this.getemplist)
      searchRepository2(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.repositoryVisible = true
          // this.memoryChecked()
          this.issearch = !this.issearch
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
      this.$router.push('/Repository/NewRepository')
      this.repositoryVisible = false
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // json数组去重
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    // 确认添加数据
    handleConfirm() {
      console.log(this.moreaction)
      const newarr = this.uniqueArray(this.moreaction, 'id')
      console.log(newarr)
      // this.$emit('repositoryname', newarr)
      // this.repositoryVisible = false
    },
    // 选择仓库数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    }
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
  .form-name{
    font-size: 18px;
    color: #373e4f;
    margin-bottom: -20px;
    margin-top: 30px;
  }
  .container{
    margin-top: 2%;
    border: 1px solid #eceff6;
  }
</style>
