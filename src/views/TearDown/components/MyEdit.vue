<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="-10px" title="修改拆装单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('TearDown.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入拆装单主题" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('TearDown.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" placeholder="请选择经办人" style="margin-left: 18px;width: 150px" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('TearDown.teardownDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.teardownDeptId" placeholder="请选择拆装部门" style="margin-left: 18px;width: 150px" clearable >
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('TearDown.teardownRepositoryId')" prop="teardownRepositoryId" style="width: 100%;">
                <el-input v-model="teardownRepositoryId" placeholder="请选择仓库" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('TearDown.summary')" prop="summary" style="width: 100%;">
                <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--入库单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.dczdsp') }}</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct2">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="beyond2">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-materials :materialcontrol.sync="materialcontrol" @product4="productdetail4"/>
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list3"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <!--          <el-editable-column :edit-render="{type: 'visible'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" min-width="170px">-->
          <!--            <template slot="edit" slot-scope="scope">-->
          <!--              <el-select v-model="scope.row.locationCode" :value="scope.row.locationCode" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">-->
          <!--                <el-option-->
          <!--                  v-for="(item, index) in locationlist"-->
          <!--                  :key="index"-->
          <!--                  :value="item.locationCode"-->
          <!--                  :label="item.locationCode"/>-->
          <!--              </el-select>-->
          <!--            </template>-->
          <!--          </el-editable-column>-->
          <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationCode" align="center" width="200px">
            <template slot-scope="scope">
              <p>{{ getLocationData(scope.row) }}</p>
            </template>
          </el-editable-column>
          <!--          <el-editable-column :edit-render="{type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="200px">-->
          <!--            <template slot="edit" slot-scope="scope">-->
          <!--              <el-select v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">-->
          <!--                <el-option-->
          <!--                  v-for="(item, index) in batchlist"-->
          <!--                  :key="index"-->
          <!--                  :value="item"-->
          <!--                  :label="item"/>-->
          <!--              </el-select>-->
          <!--            </template>-->
          <!--          </el-editable-column>-->
          <el-editable-column :edit-render="{type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="200px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', events: {change: beyond}}" :label="$t('updates.shuli')" prop="quantity" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.je')" prop="totalMoney" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize2(scope.row.quantity, scope.row.price) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit2(scope.row)" v-model="scope.row.carCode" clearable @blur="getInfo(scope.row)"/>
              <span v-else>{{ scope.row.carCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit2(scope.row)" v-model="scope.row.motorCode" clearable @blur="getInfo3(scope.row)"/>
              <span v-else>{{ scope.row.motorCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit4(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
              <span v-else>{{ scope.row.batteryCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--拆装后的商品      -->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.czhdsp') }}</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
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
          <!--          <el-editable-column :edit-render="{type: 'visible'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" min-width="170px">-->
          <!--            <template slot="edit" slot-scope="scope">-->
          <!--              <el-select v-model="scope.row.locationCode" :value="scope.row.locationCode" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch4($event,scope)">-->
          <!--                <el-option-->
          <!--                  v-for="(item, index) in locationlist"-->
          <!--                  :key="index"-->
          <!--                  :value="item.locationCode"-->
          <!--                  :label="item.locationCode"/>-->
          <!--              </el-select>-->
          <!--            </template>-->
          <!--          </el-editable-column>-->
          <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="item in locationlist"
                  :key="item.id"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.je')" prop="totalMoney" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.quantity, scope.row.price) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handlesave()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getlocation, batchlist, locationlist } from '@/api/public'
import { materialslist2 } from '@/api/MaterialsList'
import { updateteardown } from '@/api/TearDown'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import MyBulid from './MyBulid'
import MyMaterials from './MyMaterials'
var _that
export default {
  components: { MyBulid, MyRepository, MyDetail, MyCreate, MyAccept, MyMaterials },
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
    const validatePass = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.teardownRepositoryId === undefined || this.teardownRepositoryId === null || this.teardownRepositoryId === '') {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    return {
      batchlist: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改row数据
      personalForm: this.editdata,
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: '',
      // 仓库回显
      teardownRepositoryId: '',
      // 经办人控制窗口
      createcontrol: false,
      // 仓库控制窗口
      repositorycontrol: false,
      // 控制待拆装商品列表窗口
      control: false,
      // 控制拆装后商品列表窗口
      buildcontrol: false,
      // 拆装单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        teardownRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      },
      // 拆装单明细数据
      list2: [],
      // 拆装后明细数据
      list3: [],
      // 拆装明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 拆装明细中货位数据
      locationlist: [],
      // 拆装单明细列表规则
      validRules: {
      },
      materialcontrol: false
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      console.log()
      this.personalForm = this.editdata
      this.handlePersonId = this.personalForm.handlePersonName
      this.teardownRepositoryId = this.personalForm.teardownRepositoryName
      this.list2 = this.personalForm.teardownAfterDetailVos
      this.list3 = this.personalForm.teardownBeforeDetailVos
      this.getlocation2()
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlocation2() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.teardownRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.teardownRepositoryId, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.teardownRepositoryId, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.teardownRepositoryId, row).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.locationCode = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
            console.log('row.locationCode', row.locationCode)
          } else {
            row.locationCode = null
            row.locationId = null
          }
        }
      })
      return row.locationCode
    },
    // 判断整车
    isEdit2(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01') { return true } else { return false }
    },
    // 判断整车或者电池
    isEdit4(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01' || re === '05') { return true } else { return false }
    },
    productdetail4(val) {
      console.log('33333333333', val)
      const nowlistdata = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        let m = 1
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            m = 2
          }
        }
        const re = val[i].productCode.slice(0, 2)
        if (re === '01' || re === '05') {
          m = 1
        }
        if (m === 1) {
          this.$refs.editable2.insert(val[i])
        }
      }
      this.setbeforeproduct()
    },
    updatebatch4(event, scope) {
      console.log('我执行了')
      this.locationlist = []
      if (event === true) {
        getlocation(this.personalForm.teardownRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            console.log(res.data.data.content)
            console.log(res.data.data.content.length)
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              getlocation(this.personalForm.teardownRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content
                }
              })
            }
          }
        })
      }
    },
    updatebatch(event, scope) {
      if (event === true) {
        getlocation(this.personalForm.teardownRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.teardownRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
      // if (event === true) {
      //   getlocation(this.personalForm.teardownRepositoryId, scope.row).then(res => {
      //     if (res.data.ret === 200) {
      //       this.locationlist = res.data.data.content
      //       if (res.data.data.content.length !== 0) {
      //         this.locationlist = res.data.data.content
      //         scope.row.locationId = res.data.data.content[0].id
      //       }
      //     }
      //   })
      // }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.countRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    beyond() {
      this.$refs.editable.clear()
      this.setbeforeproduct()
    },
    beyond2() {
      this.$refs.editable2.removeSelecteds()
      this.$refs.editable.clear()
      this.setbeforeproduct()
    },
    // 设置待拆装商品
    async setbeforeproduct() {
      console.log('error1')
      this.$refs.editable.clear()
      const edittabledata = this.$refs.editable2.getRecords()
      if (edittabledata.length !== 0) {
        const list = await Promise.all(edittabledata.map(item => {
          return materialslist2(item.productCode)
        }))
        const newarr3 = list.map(item => {
          return item.data.data.content.list
        })
        const bomproduct1 = [].concat.apply([], newarr3)

        console.log('list', list)
        console.log('bomproduct1-1', bomproduct1)
        for (const i in edittabledata) {
          for (const j in bomproduct1) {
            if (edittabledata[i].productCode === bomproduct1[j].productCode) {
              bomproduct1[j].quantity = edittabledata[i].quantity
            }
          }
        }
        console.log('bomproduct1', bomproduct1)

        const newarr4 = bomproduct1.map(item => {
          return item.materialsListDetailVos
        })
        const materialsListDetailVos = [].concat.apply([], newarr4)

        for (const a in materialsListDetailVos) {
          for (const b in bomproduct1) {
            if (materialsListDetailVos[a].materialsId === bomproduct1[b].id) {
              materialsListDetailVos[a].quantity = Number(materialsListDetailVos[a].quantity) * Number(bomproduct1[b].quantity)
            }
          }
        }
        for (const c in materialsListDetailVos) {
          getlocation(this.personalForm.teardownRepositoryId, materialsListDetailVos[c].productCode).then(res => {
            if (res.data.ret === 200) {
              materialsListDetailVos[c].locationCode = res.data.data.content[0].locationCode
              materialsListDetailVos[c].locationId = res.data.data.content[0].id
              // materialsListDetailVos[c].price = 0
              materialsListDetailVos[c].totalMoney = 0
            }
          })
        }
        console.log('materialsListDetailVos', materialsListDetailVos)
        const materialsListDetailVos2 = this.deepClone(materialsListDetailVos)
        for (const c in materialsListDetailVos2) {
          getlocation(this.personalForm.teardownRepositoryId, materialsListDetailVos2[c].productCode).then(res => {
            if (res.data.ret === 200) {
              materialsListDetailVos2[c].locationCode = res.data.data.content[0].locationCode
              materialsListDetailVos2[c].locationId = res.data.data.content[0].id
              // materialsListDetailVos2[c].price = 0
              materialsListDetailVos2[c].totalMoney = 0
            }
          })
        }
        const newArr = []
        materialsListDetailVos2.forEach(el => {
          const result = newArr.findIndex(ol => {
            return el.productCode === ol.productCode
          })
          console.log('result', result)
          if (result !== -1) {
            newArr[result].quantity = newArr[result].quantity + el.quantity
          } else {
            newArr.push(el)
          }
        })
        console.log('newArr', newArr)
        // this.$refs.editable = newArr
        console.log('error2')
        for (let i = 0; i < newArr.length; i++) {
          this.$refs.editable.insert(newArr[i])
        }
      }
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.teardownRepositoryId, parms3).then(res => {
          console.log(res)
          this.batchlist = res.data.data.content
        })
      }
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.teardownRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 经办人返回数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.teardownRepositoryId = val.repositoryName
      this.personalForm.teardownRepositoryId = val.id
      // this.locationlistparms.repositoryId = val.id
      // locationlist(this.locationlistparms).then(res => {
      //   if (res.data.ret === 200) {
      //     this.locationlist = res.data.data.content.list.map(function(item) {
      //       return {
      //         'value': item.id,
      //         'label': item.locationName
      //       }
      //     })
      //   }
      // })
    },
    // 拆装单事件
    // 新增拆装单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    handleAddproduct2() {
      // this.buildcontrol = true
      if (this.personalForm.teardownRepositoryId === null || this.personalForm.teardownRepositoryId === undefined || this.personalForm.teardownRepositoryId === '') {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.sqslcg'),
          offset: 100
        })
        return false
      } else {
        this.materialcontrol = true
      }
    },
    productdetail2(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable2.insert(val[i])
      }
    },
    // 拆装金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 拆装后金额计算
    getSize2(quan, pric) {
      return quan * pric
    },
    // 修改和取消按钮
    // 修改按钮
    async handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let i = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        locationlist(null, elem.locationCode).then(res => {
          if (res.data.ret === 200) {
            elem.locationId = res.data.data.content.list[0].id
            console.log('res.data.data.content.list[0].id', res.data.data.content.list[0].id)
            console.log('elem.locationId', elem.locationId)
          }
        })
        if (elem.locationCode === null || elem.locationCode === '' || elem.locationCode === undefined) {
          i = 4
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.typeIdname === null || elem.typeIdname === '' || elem.typeIdname === undefined) {
          delete elem.typeIdname
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      if (i === 4) {
        this.$notify.error({
          title: 'wrong',
          message: '拆装后的商品货位不能为空',
          offset: 100
        })
        return false
      }
      const list = await Promise.all(EnterDetail.map(function(item) {
        return locationlist(null, item.locationCode)
      }))

      console.log('list', list)

      const list2 = list.map(item => {
        return item.data.data.content.list[0]
      })
      console.log('list2', list2)

      for (const a in list2) {
        for (const b in EnterDetail) {
          if (list2[a].locationCode === EnterDetail[b].locationCode) {
            EnterDetail[b].locationId = list2[a].id
          }
        }
      }

      const EnterDetail2 = this.$refs.editable2.getRecords()
      let mm = 1
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        const re = elem.productCode.slice(0, 2)
        if (re === '01' || re === '05') {
          if (elem.quantity !== 1) {
            mm = 2
          }
        }
        if (elem.locationCode === null || elem.locationCode === '' || elem.locationCode === undefined) {
          i = 2
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          i = 3
        }
      })
      if (mm === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '整车和电池数量只能为1',
          offset: 100
        })
        return false
      }
      if (i === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '拆装前的商品货位不能为空',
          offset: 100
        })
        return false
      }
      if (i === 3) {
        this.$notify.error({
          title: 'wrong',
          message: '拆装前的商品批次不能为空',
          offset: 100
        })
        return false
      }
      if (EnterDetail2.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let m = 1
      let b = 1
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        const re = elem.productCode.slice(0, 2)
        if (re === '01') {
          if (elem.carCode === null || elem.carCode === undefined || elem.carCode === '' || elem.motorCode === null || elem.motorCode === undefined || elem.motorCode === '') {
            m = 2
          }
        }
      })
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        const re = elem.productCode.slice(0, 2)
        if (re === '05') {
          if (elem.batteryCode === null || elem.batteryCode === undefined || elem.batteryCode === '') {
            b = 2
          }
        }
      })
      if (m === 2) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.zcckytbm'),
          offset: 100
        })
        return false
      }

      if (b === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '电池出库时电池编码必填',
          offset: 100
        })
        return false
      }
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.typeIdname === null || elem.typeIdname === '' || elem.typeIdname === undefined) {
          delete elem.typeIdname
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      const parms = JSON.stringify(this.personalForm)
      const parms2 = JSON.stringify(EnterDetail2)
      const parms3 = JSON.stringify(EnterDetail)
      console.log(parms)
      console.log(parms2)
      console.log(parms3)
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              updateteardown(parms, parms2, parms3, this.personalForm).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: 'successful',
                    message: 'save successful',
                    type: 'success',
                    offset: 100
                  })
                  this.$refs.editable.clear()
                  this.$refs.editable2.clear()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                  this.editVisible = false
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            }
          }).catch(valid => {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            return false
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.editable2.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
