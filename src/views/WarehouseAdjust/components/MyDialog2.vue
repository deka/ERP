<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="-10px" title="修改库位调整单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="120px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.title2')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 150px" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.adjustDeptId" style="margin-left: 18px;width: 150px" clearable >
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustRepositoryId')" prop="adjustRepositoryId" style="width: 100%;">
                <el-input v-model="adjustRepositoryId" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
            </el-col>
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/><br>
          </el-row>
          <el-row style="margin-top: 23px">
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustReason')" style="width: 100%;">
                <el-input v-model="personalForm.adjustReason" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustDate')" prop="adjustDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.adjustDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 150px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--日常调整单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.rctzdmx') }}</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-detail3 :control.sync="control" :personalform="personalForm" :checklist.sync="checklist" @product="productdetail"/>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.dckw')" prop="outLocationCode" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getLocationData(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElSelect', type: 'default'}" :label="$t('updates.drkw')" prop="enterLocationId" align="center" width="150px">
            <template slot-scope="scope" >
              <el-select v-model="scope.row.enterLocationId" :value="scope.row.enterLocationId" :placeholder="$t('Hmodule.xzhw')" filterable style="width: 100%;" @visible-change="alllocations($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist2"
                  :key="index"
                  :label="item.locationCode"
                  :value="item.id"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.kcsl')" prop="inventoryQuantity" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getquantity(scope.row) }}</p>
            </template>
          </el-editable-column>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getlocation, locationlist, batchlist, getQuantity2 } from '@/api/public'
import { updateadjust } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail3 from './MyDetail3'
var _that
export default {
  components: { MyRepository, MyCreate, MyDetail3 },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      checklist: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 供应商信息数据
      personalForm: this.editdata,
      // 调整仓库回显
      adjustRepositoryId: '',
      // 批次数据
      batchlist: [],
      // 经办人回显
      handlePersonId: '',
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      // 调入货位
      locationlist2: [],
      // 部门数据
      depts: [],
      // 入库仓库回显
      enterRepositoryId: '',
      // 入库人回显
      enterPersonId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 入库单明细数据
      list2: [],
      // 入库单明细列表规则
      validRules: {
      },
      // 库存入库单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'blue' }
        ],
        adjustRepositoryId: [
          { required: true, message: '请选择调整仓库', trigger: 'blue' }
        ],
        adjustDate: [
          { required: true, message: '请选择调整日期', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.handlePersonId = this.personalForm.handlePersonName
      this.adjustRepositoryId = this.personalForm.adjustRepositoryName
      this.list2 = this.personalForm.locationAdjustDetailVos
      this.getlocation()
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getLocationData(row) {
      // 默认货位
      getlocation(this.personalForm.saleRepositoryId, row).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.location = res.data.data.content[0].locationCode
            row.outLocationCode = res.data.data.content[0].id
            row.outLocationId = res.data.data.content[0].id
            console.log('row.locationId', row.locationId)
          } else {
            row.location = null
            row.locationId = null
          }
        }
      })
      return row.location
    },
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.adjustRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
          this.locationlist2 = res.data.data.content.list
        }
      })
    },
    // 入库人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
      this.personalForm.adjustDeptId = val.deptId
      this.personalForm.adjustRepositoryId = val.repositoryId
      this.adjustRepositoryId = val.repositoryName
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.adjustRepositoryId = val.repositoryName
      this.personalForm.adjustRepositoryId = val.id
    },
    // 调出库位
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.adjustRepositoryId)
        if (this.personalForm.adjustRepositoryId === undefined || this.personalForm.adjustRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.adjustRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.outLocationId = res.data.data.content[0].id
              this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.gckmygsp'),
                offset: 100
              })
              this.locationlist = []
              return false
            }
          }
        })
        return this.locationlist
      }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.adjustRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.adjustRepositoryId, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    getquantity(sco) {
      // const parms2 = sco.outLocationId
      const parms3 = sco.productCode
      // const parms4 = sco.batch
      // if (parms4 !== '' && parms4 !== null && parms4 !== undefined) {
      getQuantity2(this.personalForm.adjustRepositoryId, null, parms3, null).then(res => {
        this.out = res.data.data.content
        sco.inventoryQuantity = this.out
      })
      return sco.inventoryQuantity
      // }
    },
    alllocations(event, scope) {
      if (event === true) {
        if (this.personalForm.adjustRepositoryId === undefined || this.personalForm.adjustRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        locationlist(this.personalForm.adjustRepositoryId).then(res => {
          if (res.data.ret === 200) {
            this.locationlist2 = res.data.data.content.list
          }
        })
      }
    },
    // 入库单事件
    // 新增入库单明细
    handleAddproduct() {
      if (this.personalForm.adjustRepositoryId !== null && this.personalForm.adjustRepositoryId !== '' && this.personalForm.adjustRepositoryId !== undefined && this.personalForm.adjustRepositoryId !== 0) {
        this.control = true
        this.checklist = this.$refs.editable.getRecords()
      } else {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.sqslcg'),
          offset: 100
        })
        return false
      }
    },
    productdetail(val) {
      const myval = this.$store.getters.myflagApproval
      for (let i = 0; i < this.checklist.length; i++) {
        for (let j = 0; j < myval.length; j++) {
          if (String(this.checklist[i].productCode) === String(myval[j])) {
            this.checklist.splice(i, 1)
          }
        }
      }
      const processval = this.checklist
      let finalval = []
      finalval = processval.concat(val)
      console.log('val', val)
      const obj = {}
      const processaction = finalval.reduce((cur, next) => {
        obj[next.productId] ? '' : obj[next.productId] = true && cur.push(next)
        return cur
      }, [])
      for (let i = 0; i < processaction.length; i++) {
        processaction[i].quantity = 1
        // this.$refs.editable.insert(finalval[i])
      }
      this.list2 = processaction
      console.log('123', processaction)
      const that = this
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.$refs.editable.getRecords()
      console.log(EnterDetail)
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let j = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.outLocationCode === null || elem.outLocationCode === undefined || elem.outLocationCode === '' || elem.enterLocationId === null || elem.enterLocationId === undefined || elem.enterLocationId === '') {
          j = 2
        }
      })
      console.log(j)
      if (j === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '调入货位和调出货位都不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.inventoryQuantity === null || elem.inventoryQuantity === '' || elem.inventoryQuantity === undefined) {
          delete elem.inventoryQuantity
        }
        if (elem.outLocationId === null || elem.outLocationId === '' || elem.outLocationId === undefined) {
          delete elem.outLocationId
        }
        if (elem.enterLocationId === null || elem.enterLocationId === '' || elem.enterLocationId === undefined) {
          delete elem.enterLocationId
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const parms = JSON.stringify(this.personalForm)
      for (const key in parms) {
        if (parms[key] === '' || parms[key] === undefined || parms[key] === null) {
          delete parms[key]
        }
        if (key === 'judgeStat') {
          delete parms[key]
        }
      }
      updateadjust(parms, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.editable.clear()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
