<template>
  <el-dialog :visible.sync="productVisible" :control="control" :close-on-press-escape="false" top="10px" title="选择经办人" append-to-body @close="$emit('update:control', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.code" :placeholder="$t('Product.code')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productname" :placeholder="$t('Product.productname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.supplierid" :placeholder="$t('Product.supplierid')" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.categoryid" :value="getemplist.categoryid" :placeholder="$t('Hmodule.wpfl')" class="filter-item" clearable>
        <el-option value="1" label="类1"/>
        <el-option value="2" label="类2"/>
      </el-select>
      <!-- 更多搜索条件下拉栏 -->
      <el-popover
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.typeid" :placeholder="$t('Hmodule.qxzggxh')" clearable style="width: 40%;float: left;margin-left: 20px">
          <el-option value="1" label="类1"/>
          <el-option value="2" label="类2"/>
        </el-select>
        <el-select v-model="getemplist.isactive" :placeholder="$t('Hmodule.qxzsxj')" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option :label="$t('Hmodule.s1')" value="1"/>
          <el-option :label="$t('Hmodule.x2')" value="2"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <!-- 列表开始 -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @current-change="handleSelectionChange">
      <el-table-column :label="$t('Product.code')" :resizable="false" prop="code" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.productname')" :resizable="false" prop="ProductName" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.categoryid')" :resizable="false" prop="category" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.typeid')" :resizable="false" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.productType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.color')" :resizable="false" prop="color" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.kpigrade')" :resizable="false" prop="kpiGrade" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.kpiGrade }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.point')" :resizable="false" prop="point" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.point }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.saleprice')" :resizable="false" prop="costPrice" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.salePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.purchaseprice')" :resizable="false" prop="purchasePrice" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.purchasePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.createid')" :resizable="false" prop="createName" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Product.createTime')" :resizable="false" prop="createTime" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表结束 -->
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="getlist" />
    <span slot="footer" class="dialog-footer">
      <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { productlist } from '@/api/Product'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
var _that
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    }
  },
  props: {
    control: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 物品选择框控制
      productVisible: this.control,
      // 批量操作
      moreaction: '',
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 供应商列表查询加展示参数
      getemplist: {
        productid: '',
        code: '',
        productname: '',
        categoryid: '',
        typeid: '',
        isactive: '',
        Productid: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  watch: {
    control() {
      this.productVisible = this.control
      console.log(this.control)
      this.getlist()
    }
  },
  created() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      // 商品列表数据
      this.listLoading = true
      productlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      productlist(this.getemplist).then(res => {
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
    // 新增数据
    handleAdd() {
      this.$router.push('/Product/NewProduct')
      this.productVisible = false
    },
    // 物品选择添加
    handleAddTo() {
      this.productVisible = false
      this.$emit('product', this.moreaction)
    }
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 150px;
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
