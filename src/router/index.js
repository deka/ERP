import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

// /* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {
      type: 0
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'dashboard',
        meta: { title: 'nwow', icon: 'shouye', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/EmployeeInformation',
    component: Layout,
    redirect: 'noredirect',
    name: 'EmployeeInformation',
    alwaysShow: true,
    meta: {
      title: 'EmployeeInformation',
      icon: 'ziliao',
      type: 1,
      roles: ['1-2-3-1', '1-2-4-4', '1-2-5-13', '1-2-6-1', '1-2-7-4']
    },
    children: [
      {
        path: 'NewEmployeeInformation',
        component: () => import('@/views/EmployeeInformation/NewEmployeeInformation'),
        name: 'NewEmployeeInformation',
        meta: { title: 'NewEmployeeInformation', noCache: false, roles: ['1-2-3-1'] }
      },
      {
        path: 'EmployeeInformationList',
        component: () => import('@/views/EmployeeInformation/EmployeeInformationList'),
        name: 'EmployeeInformationList',
        meta: { title: 'EmployeeInformationList', noCache: true, roles: ['1-2-4-1', '1-2-4-2', '1-2-4-3', '1-2-4-4', '1-2-4-5', '1-2-4-6', '1-2-4-7', '1-2-4-8', '1-2-4-9', '1-2-4-10', '1-2-4-10', '1-2-4-11', '1-2-4-12'] }
      },
      {
        path: 'EmployeeContract',
        component: () => import('@/views/EmployeeInformation/EmployeeContract'),
        name: 'EmployeeContract',
        meta: { title: 'EmployeeContract', noCache: true, roles: ['1-2-7-1', '1-2-7-2', '1-2-7-3', '1-2-7-4', '1-2-7-5', '1-2-7-8', '1-2-7-9', '1-2-7-63'] }
      },
      {
        path: 'NewEmployeeContract',
        component: () => import('@/views/EmployeeInformation/NewEmployeeContract'),
        name: 'NewEmployeeContract',
        meta: { title: 'NewEmployeeContract', noCache: true, roles: ['1-2-6-1'] }
      },
      {
        path: 'EmpCategory',
        component: () => import('@/views/EmployeeInformation/EmpCategory'),
        name: 'EmpCategory',
        meta: { title: 'EmpCategory', noCache: true, roles: ['1-2-8-1', '1-2-8-2', '1-2-8-3', '1-2-8-4', '1-2-8-5', '1-2-8-6', '1-2-8-7', '1-2-8-8', '1-2-8-9'] }
      }
    ]
  },
  {
    path: '/Repository',
    component: Layout,
    redirect: 'noredirect',
    name: 'Repository',
    alwaysShow: true,
    meta: {
      title: 'Repository',
      icon: 'cangku',
      type: 1,
      roles: ['1-9-10-1', '1-9-11-4', '1-9-13-4', '1-9-12-13']
    },
    children: [
      {
        path: 'NewRepository',
        component: () => import('@/views/Repository/NewRepository'),
        name: 'NewRepository',
        meta: { title: 'NewRepository', noCache: false, roles: ['1-9-10-1'] }
      },
      {
        path: 'RepositoryList',
        component: () => import('@/views/Repository/RepositoryList'),
        name: 'RepositoryList',
        meta: { title: 'RepositoryList', noCache: true, roles: ['1-9-11-1', '1-9-11-2', '1-9-11-3', '1-9-11-4', '1-9-11-5', '1-9-11-6', '1-9-11-7', '1-9-11-8', '1-9-11-9'] }
      },
      {
        path: 'RepCategory',
        component: () => import('@/views/Repository/RepCategory'),
        name: 'RepCategory',
        meta: { title: 'RepCategory', noCache: true, roles: ['1-9-13-1', '1-9-13-2', '1-9-13-3', '1-9-13-4', '1-9-13-5', '1-9-13-6', '1-9-13-7', '1-9-13-8', '1-9-13-9'] }
      },
      {
        path: 'Manyinsert',
        component: () => import('@/views/Repository/Manyinsert'),
        name: 'Manyinsert',
        meta: { title: 'Manyinsert', noCache: true, roles: ['1-9-12-13'] }
      }
    ]
  },
  {
    path: '/Customer',
    component: Layout,
    redirect: 'noredirect',
    name: 'Customer',
    alwaysShow: true,
    meta: {
      title: 'Customer',
      icon: 'kehu',
      type: 1,
      roles: ['1-14-15-1', '1-14-16-4', '1-14-19-13', '1-14-17-1', '1-14-18-4', '1-14-21-4']
    },
    children: [
      {
        path: 'NewCustomer',
        component: () => import('@/views/Customer/NewCustomer'),
        name: 'NewCustomer',
        meta: { title: 'NewCustomer', noCache: false, roles: ['1-14-15-1'] }
      },
      {
        path: 'CustomerList',
        component: () => import('@/views/Customer/CustomerList'),
        name: 'CustomerList',
        meta: { title: 'CustomerList', noCache: true, roles: ['1-14-16-1', '1-14-16-2', '1-14-16-3', '1-14-16-4', '1-14-16-5', '1-14-16-6', '1-14-16-7', '1-14-16-11'] }
      },
      {
        path: 'ManyCustomer',
        component: () => import('@/views/Customer/ManyCustomer'),
        name: 'ManyCustomer',
        meta: { title: 'ManyCustomer', noCache: true, roles: ['1-14-19-13'] }
      },
      {
        path: 'NewAgent',
        component: () => import('@/views/Customer/NewAgent'),
        name: 'NewAgent',
        meta: { title: 'NewAgent', noCache: false, roles: ['1-14-17-1'] }
      },
      {
        path: 'AgentList',
        component: () => import('@/views/Customer/AgentList'),
        name: 'AgentList',
        meta: { title: 'AgentList', noCache: true, roles: ['1-14-18-1', '1-14-18-2', '1-14-18-3', '1-14-18-4', '1-14-18-5', '1-14-18-6', '1-14-18-7'] }
      },
      {
        path: 'CustomerCategory',
        component: () => import('@/views/Customer/CustomerCategory'),
        name: 'CustomerCategory',
        meta: { title: 'CustomerCategory', noCache: true, roles: ['1-14-21-1', '1-14-21-2', '1-14-21-3', '1-14-21-4', '1-14-21-5', '1-14-21-6', '1-14-21-7', '1-14-21-8', '1-14-21-9'] }
      }
    ]
  },
  {
    path: '/Supplier',
    component: Layout,
    redirect: 'noredirect',
    name: 'Supplier',
    alwaysShow: true,
    meta: {
      title: 'Supplier',
      icon: 'gongyinshang',
      type: 1,
      roles: ['1-22-23-1', '1-22-24-4', '1-22-25-1', '1-22-26-4', '1-22-27-13', '1-22-28-4', '1-22-29-1', '1-22-30-4']
    },
    children: [
      {
        path: 'NewSupplier',
        component: () => import('@/views/Supplier/NewSupplier'),
        name: 'NewSupplier',
        meta: { title: 'NewSupplier', noCache: false, roles: ['1-22-23-1'] }
      },
      {
        path: 'SupplierList',
        component: () => import('@/views/Supplier/SupplierList'),
        name: 'SupplierList',
        meta: { title: 'SupplierList', noCache: true, roles: ['1-22-24-1', '1-22-24-2', '1-22-24-3', '1-22-24-4', '1-22-24-5', '1-22-24-6', '1-22-24-7', '1-22-24-64'] }
      },
      {
        path: 'SupplierCategory',
        component: () => import('@/views/Supplier/SupplierCategory'),
        name: 'SupplierCategory',
        meta: { title: 'SupplierCategory', noCache: true, roles: ['1-22-28-1', '1-22-28-2', '1-22-28-3', '1-22-28-4', '1-22-28-5', '1-22-28-6', '1-22-28-7', '1-22-28-8', '1-22-28-9'] }
      },
      {
        path: 'ManySupplier',
        component: () => import('@/views/Supplier/ManySupplier'),
        name: 'ManySupplier',
        meta: { title: 'ManySupplier', noCache: true, roles: ['1-22-27-13'] }
      }
    ]
  },
  {
    path: '/Product',
    component: Layout,
    redirect: 'noredirect',
    name: 'Product',
    alwaysShow: true,
    meta: {
      title: 'Product',
      icon: 'wupin',
      type: 1,
      roles: ['1-31-32-1', '1-31-33-4', '1-31-34-1', '1-31-35-4', '1-31-36-13', '1-31-37-1', '1-31-38-4']
    },
    children: [
      {
        path: 'NewProduct',
        component: () => import('@/views/Product/NewProduct'),
        name: 'NewProduct',
        meta: { title: 'NewProduct', noCache: false, roles: ['1-31-32-1'] }
      },
      {
        path: 'ProductList',
        component: () => import('@/views/Product/ProductList'),
        name: 'ProductList',
        meta: { title: 'ProductList', noCache: true, roles: ['1-31-33-1', '1-31-33-2', '1-31-33-3', '1-31-33-4', '1-31-33-5', '1-31-33-6', '1-31-33-7', '1-31-33-14', '1-31-33-15'] }
      },
      {
        path: 'Newadjustprice',
        component: () => import('@/views/Product/Newadjustprice'),
        name: 'Newadjustprice',
        meta: { title: 'Newadjustprice', noCache: false, roles: ['1-31-34-1'] }
      },
      {
        path: 'AdjustpriceList',
        component: () => import('@/views/Product/AdjustpriceList'),
        name: 'AdjustpriceList',
        meta: { title: 'AdjustpriceList', noCache: true, roles: ['1-31-35-1', '1-31-35-2', '1-31-35-3', '1-31-35-4', '1-31-35-5', '1-31-35-6', '1-31-35-7'] }
      },
      {
        path: 'ProductCategory',
        component: () => import('@/views/Product/ProductCategory'),
        name: 'ProductCategory',
        meta: { title: 'ProductCategory', noCache: true, roles: ['1-31-38-1', '1-31-38-2', '1-31-38-3', '1-31-38-4', '1-31-38-5', '1-31-38-6', '1-31-38-7', '1-31-38-8', '1-31-38-9'] }
      },
      {
        path: 'ManyProduct',
        component: () => import('@/views/Product/ManyProduct'),
        name: 'ManyProduct',
        meta: { title: 'ManyProduct', noCache: true, roles: ['1-31-36-13'] }
      },
      {
        path: 'detaillist',
        component: () => import('@/views/Product/detaillist'),
        name: 'detaillist',
        meta: { title: 'detaillist', noCache: true, roles: ['1-31-37-1'] }
      }
    ]
  },
  {
    path: '/LogisticsCar',
    component: Layout,
    redirect: 'noredirect',
    name: 'LogisticsCar',
    alwaysShow: true,
    meta: {
      title: 'LogisticsCar',
      icon: 'wuliu',
      type: 1
    },
    children: [
      {
        path: 'AddLogisticsCar',
        component: () => import('@/views/LogisticsCar/AddLogisticsCar'),
        name: 'AddLogisticsCar',
        meta: { title: 'AddLogisticsCar', noCache: false }
      },
      {
        path: 'LogisticsCarlist',
        component: () => import('@/views/LogisticsCar/LogisticsCarlist'),
        name: 'LogisticsCarlist',
        meta: { title: 'LogisticsCarlist', noCache: true }
      }
    ]
  },
  {
    path: '/BasicSettings',
    component: Layout,
    redirect: 'noredirect',
    name: 'BasicSettings',
    alwaysShow: true,
    meta: {
      title: 'BasicSettings',
      icon: 'shezhi',
      type: 1,
      roles: ['1-39-40-1', '1-39-41-1', '1-39-41-4', '1-39-42-4', '1-39-43-1', '1-39-44-1', '1-39-45-4', '1-39-46-1', '1-39-47-4', '1-39-48-1', '1-39-49-1', '1-39-50-4', '1-39-51-1', '1-39-52-1']
    },
    children: [
      {
        path: 'Dept',
        component: () => import('@/views/BasicSettings/Dept'),
        name: 'Dept',
        meta: { title: 'Dept', noCache: true }
      },
      {
        path: 'NumberingRules',
        component: () => import('@/views/BasicSettings/NumberingRules'),
        name: 'NumberingRules',
        meta: { title: 'NumberingRules', noCache: true, roles: ['1-39-41-1', '1-39-41-2', '1-39-41-3', '1-39-41-4', '1-39-41-5', '1-39-41-6', '1-39-41-7', '1-39-41-8', '1-39-41-9'] }
      },
      {
        path: 'SMSModelList',
        component: () => import('@/views/BasicSettings/SMSModelList'),
        name: 'SMSModelList',
        meta: { title: 'SMSModelList', noCache: true, roles: ['1-39-42-1', '1-39-42-2', '1-39-42-3', '1-39-42-4', '1-39-42-5', '1-39-42-6', '1-39-42-7', '1-39-42-8', '1-39-42-9'] }
      },
      {
        path: 'Measurement',
        component: () => import('@/views/BasicSettings/Measurement'),
        name: 'Measurement',
        meta: { title: 'Measurement', noCache: true, roles: ['1-39-47-1', '1-39-47-2', '1-39-47-3', '1-39-47-4', '1-39-47-5', '1-39-47-6', '1-39-47-7', '1-39-47-8', '1-39-47-9', '1-39-48-1'] }
      },
      {
        path: 'Commission',
        component: () => import('@/views/BasicSettings/Commission'),
        name: 'Commission',
        meta: { title: 'Commission', noCache: true, roles: ['1-39-44-1'] }
      },
      {
        path: 'Parameter',
        component: () => import('@/views/BasicSettings/Parameter'),
        name: 'Parameter',
        meta: { title: 'Parameter', noCache: true, roles: ['1-39-49-1'] }
      },
      {
        path: 'NewApprovalProcess',
        component: () => import('@/views/BasicSettings/NewApprovalProcess'),
        name: 'NewApprovalProcess',
        meta: { title: 'NewApprovalProcess', noCache: false, roles: ['1-39-46-1'] }
      },
      {
        path: 'ApprovalProcess',
        component: () => import('@/views/BasicSettings/ApprovalProcess'),
        name: 'ApprovalProcess',
        meta: { title: 'ApprovalProcess', noCache: true, roles: ['1-39-45-1', '1-39-45-2', '1-39-45-3', '1-39-45-4', '1-39-45-5', '1-39-45-6', '1-39-45-7', '1-39-45-8', '1-39-45-9'] }
      },
      {
        path: 'BatchRules',
        component: () => import('@/views/BasicSettings/BatchRules'),
        name: 'BatchRules',
        meta: { title: 'BatchRules', noCache: true, roles: ['1-39-52-1'] }
      },
      {
        path: 'Regional',
        component: () => import('@/views/BasicSettings/Regional'),
        name: 'Regional',
        meta: { title: 'Regional', noCache: true }
      }
    ]
  },
  {
    path: '/Getauthority',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'quanxian',
      type: 1,
      roles: ['1-39-53-1']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/Getauthority/index'),
        name: 'Getauthority',
        meta: { title: 'Getauthority', noCache: true, roles: ['1-39-53-1'] }
      }
    ]
  },
  // 库存管理
  {
    path: '/Stockenter',
    component: Layout,
    redirect: 'noredirect',
    name: 'Stockenter',
    alwaysShow: true,
    meta: {
      title: 'Stockenter',
      icon: 'chuku',
      type: 4,
      roles: ['131-132-133-4', '131-132-134-1', '131-132-135-4', '131-132-136-1', '131-132-137-4']
    },
    children: [
      {
        path: 'addstockenter',
        component: () => import('@/views/Stockenter/addstockenter'),
        name: 'addstockenter',
        meta: { title: 'addstockenter', noCache: false, roles: ['131-132-134-1'] }
      },
      {
        path: 'Stockenterlist',
        component: () => import('@/views/Stockenter/Stockenterlist'),
        name: 'Stockenterlist',
        meta: { title: 'Stockenterlist', noCache: true, roles: ['131-132-133-1', '131-132-133-2', '131-132-133-3', '131-132-133-4', '131-132-133-5', '131-132-133-6', '131-132-133-7', '131-132-133-18', '131-132-133-16', '131-132-133-17'] }
      },
      {
        path: 'ProduceEnter',
        component: () => import('@/views/Stockenter/ProduceEnter'),
        name: 'ProduceEnter',
        meta: { title: 'ProduceEnter', noCache: false }
      },
      {
        path: 'ProduceEnterList',
        component: () => import('@/views/Stockenter/ProduceEnterList'),
        name: 'ProduceEnterList',
        meta: { title: 'ProduceEnterList', noCache: true, roles: ['131-132-135-1', '131-132-135-2', '131-132-135-3', '131-132-135-4', '131-132-135-5', '131-132-135-6', '131-132-135-7', '131-132-135-18', '131-132-135-16', '131-132-135-17'] }
      },
      {
        path: 'AddOtherenter',
        component: () => import('@/views/Stockenter/AddOtherenter'),
        name: 'AddOtherenter',
        meta: { title: 'AddOtherenter', noCache: false, roles: ['131-132-136-1'] }
      },
      {
        path: 'OtherEnterList',
        component: () => import('@/views/Stockenter/OtherEnterList'),
        name: 'OtherEnterList',
        meta: { title: 'OtherEnterList', noCache: true, roles: ['131-132-137-1', '131-132-137-2', '131-132-137-3', '131-132-137-4', '131-132-137-5', '131-132-137-6', '131-132-137-7', '131-132-137-18', '131-132-137-16', '131-132-137-17'] }
      }
    ]
  },
  {
    path: '/StockOut',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockOut',
    alwaysShow: true,
    meta: {
      title: 'StockOut',
      icon: 'ck',
      type: 4,
      roles: ['131-138-139-1', '131-138-140-4']
    },
    children: [
      {
        path: 'AddOtherStockOut',
        component: () => import('@/views/StockOut/AddOtherStockOut'),
        name: 'AddOtherStockOut',
        meta: { title: 'AddOtherStockOut', noCache: false, roles: ['131-138-139-1'] }
      },
      {
        path: 'OtherStockOutList',
        component: () => import('@/views/StockOut/OtherStockOutList'),
        name: 'OtherStockOutList',
        meta: { title: 'OtherStockOutList', noCache: true, roles: ['131-138-140-1', '131-138-140-2', '131-138-140-3', '131-138-140-4', '131-138-140-5', '131-138-140-6', '131-138-140-7', '131-138-140-18', '131-138-140-16', '131-138-140-17'] }
      }
    ]
  },
  {
    path: '/Storagemove',
    component: Layout,
    redirect: 'noredirect',
    name: 'Storagemove',
    alwaysShow: true,
    meta: {
      title: 'Storagemove',
      icon: 'diaobo',
      type: 4,
      roles: ['131-138-142-4', '131-138-143-1']
    },
    children: [
      {
        path: 'AddStoragemove',
        component: () => import('@/views/Storagemove/AddStoragemove'),
        name: 'AddStoragemove',
        meta: { title: 'AddStoragemove', noCache: false, roles: ['131-138-143-1'] }
      },
      {
        path: 'StoragemoveList',
        component: () => import('@/views/Storagemove/StoragemoveList'),
        name: 'StoragemoveList',
        meta: { title: 'StoragemoveList', noCache: true, roles: ['131-138-142-1', '131-138-142-2', '131-138-142-3', '131-138-142-4', '131-138-142-5', '131-138-142-6', '131-138-142-7', '131-138-142-18', '131-138-142-16', '131-138-142-17', '131-138-142-50'] }
      }
      // {
      //   path: 'AddMoveApplication',
      //   component: () => import('@/views/Storagemove/AddMoveApplication'),
      //   name: 'AddMoveApplication',
      //   meta: { title: 'AddMoveApplication', noCache: false }
      // },
      // {
      //   path: 'MoveApplicationList',
      //   component: () => import('@/views/Storagemove/MoveApplicationList'),
      //   name: 'MoveApplicationList',
      //   meta: { title: 'MoveApplicationList', noCache: true }
      // }
    ]
  },
  {
    path: '/Inventorydamaged',
    component: Layout,
    redirect: 'noredirect',
    name: 'Inventorydamaged',
    alwaysShow: true,
    meta: {
      title: 'Inventorydamaged',
      icon: 'sunhuai',
      type: 4,
      roles: ['131-145-1', '131-146-4']
    },
    children: [
      {
        path: 'AddInventorydamaged',
        component: () => import('@/views/Inventorydamaged/AddInventorydamaged'),
        name: 'AddInventorydamaged',
        meta: { title: 'AddInventorydamaged', noCache: false, roles: ['131-145-1'] }
      },
      {
        path: 'InventorydamagedList',
        component: () => import('@/views/Inventorydamaged/InventorydamagedList'),
        name: 'InventorydamagedList',
        meta: { title: 'InventorydamagedList', noCache: true, roles: ['131-146-1', '131-146-2', '131-146-3', '131-146-4', '131-146-5', '131-146-6', '131-146-7', '131-146-18', '131-146-16', '131-146-17'] }
      }
    ]
  },
  {
    path: '/InventoryCount',
    component: Layout,
    redirect: 'noredirect',
    name: 'InventoryCount',
    alwaysShow: true,
    meta: {
      title: 'InventoryCount',
      icon: 'pandian',
      type: 4,
      roles: ['131-147-1', '131-148-4']
    },
    children: [
      {
        path: 'AddInventoryCount',
        component: () => import('@/views/InventoryCount/AddInventoryCount'),
        name: 'AddInventoryCount',
        meta: { title: 'AddInventoryCount', noCache: false, roles: ['131-147-1'] }
      },
      {
        path: 'InventoryCountList',
        component: () => import('@/views/InventoryCount/InventoryCountList'),
        name: 'InventoryCountList',
        meta: { title: 'InventoryCountList', noCache: true, roles: ['131-148-1', '131-148-2', '131-148-3', '131-148-4', '131-148-5', '131-148-6', '131-148-7', '131-148-18', '131-148-16', '131-148-17'] }
      }
    ]
  },
  {
    path: '/InventoryOverflow',
    component: Layout,
    redirect: 'noredirect',
    name: 'InventoryOverflow',
    alwaysShow: true,
    meta: {
      title: 'InventoryOverflow',
      icon: 'baoyi',
      type: 4,
      roles: ['131-149-1', '131-150-4']
    },
    children: [
      {
        path: 'AddInventoryOverflow',
        component: () => import('@/views/InventoryOverflow/AddInventoryOverflow'),
        name: 'AddInventoryOverflow',
        meta: { title: 'AddInventoryOverflow', noCache: false, roles: ['131-149-1'] }
      },
      {
        path: 'OverflowList',
        component: () => import('@/views/InventoryOverflow/OverflowList'),
        name: 'OverflowList',
        meta: { title: 'OverflowList', noCache: true, roles: ['131-150-1', '131-150-2', '131-150-3', '131-150-4', '131-150-5', '131-150-6', '131-150-7', '131-150-18', '131-150-16', '131-150-17'] }
      }
    ]
  },
  {
    path: '/AdjustPrice',
    component: Layout,
    redirect: 'noredirect',
    name: 'AdjustPrice',
    alwaysShow: true,
    meta: {
      title: 'AdjustPrice',
      icon: 'tiaojia',
      type: 4,
      roles: ['131-152-4']
    },
    children: [
      {
        path: 'AddAdjustPrice',
        component: () => import('@/views/AdjustPrice/AddAdjustPrice'),
        name: 'AddAdjustPrice',
        meta: { title: 'AddAdjustPrice', noCache: false, roles: ['131-151-1'] }
      },
      {
        path: 'AdjustPriceList',
        component: () => import('@/views/AdjustPrice/AdjustPriceList'),
        name: 'AdjustPriceList',
        meta: { title: 'AdjustPriceList', noCache: true, roles: ['131-152-1', '131-152-2', '131-152-3', '131-152-4', '131-152-5', '131-152-6', '131-152-7', '131-152-18', '131-152-16', '131-152-17'] }
      }
    ]
  },
  {
    path: '/StockAlarm',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockAlarm',
    alwaysShow: true,
    meta: {
      title: 'StockAlarm',
      icon: 'yujing',
      type: 4,
      roles: ['131-153-4']
    },
    children: [
      {
        path: 'StockAlarmList',
        component: () => import('@/views/StockAlarm/StockAlarmList'),
        name: 'StockAlarmList',
        meta: { title: 'StockAlarmList', noCache: true, roles: ['131-153-4', '131-153-6', '131-153-7'] }
      },
      {
        path: 'BatchAlarm',
        component: () => import('@/views/StockAlarm/BatchAlarm'),
        name: 'BatchAlarm',
        meta: { title: 'BatchAlarm', noCache: true }
      },
      {
        path: 'AddStockAlarm',
        component: () => import('@/views/WarehouseAdjust/AddStockAlarm'),
        name: 'AddStockAlarm',
        meta: { title: 'AddStockAlarm', noCache: false }
      },
      {
        path: 'SearchStockAlarmRules',
        component: () => import('@/views/StockAlarm/SearchStockAlarmRules'),
        name: 'SearchStockAlarmRules',
        meta: { title: 'SearchStockAlarmRules', noCache: true }
      }
    ]
  },
  {
    path: '/BuildUp',
    component: Layout,
    redirect: 'noredirect',
    name: 'BuildUp',
    alwaysShow: true,
    meta: {
      title: 'BuildUp',
      icon: 'zuzhuang',
      type: 4,
      roles: ['131-156-1', '131-157-4']
    },
    children: [
      {
        path: 'AddBuildUp',
        component: () => import('@/views/BuildUp/AddBuildUp'),
        name: 'AddBuildUp',
        meta: { title: 'AddBuildUp', noCache: false, roles: ['131-156-1'] }
      },
      {
        path: 'BuildUpList',
        component: () => import('@/views/BuildUp/BuildUpList'),
        name: 'BuildUpList',
        meta: { title: 'BuildUpList', noCache: true, roles: ['131-157-1', '131-157-2', '131-157-3', '131-157-4', '131-157-5', '131-157-6', '131-157-7', '131-157-18', '131-157-16', '131-157-17'] }
      }
    ]
  },
  {
    path: '/TearDown',
    component: Layout,
    redirect: 'noredirect',
    name: 'TearDown',
    alwaysShow: true,
    meta: {
      title: 'TearDown',
      icon: 'chaizhuan',
      type: 4,
      roles: ['131-158-1', '131-159-4']
    },
    children: [
      {
        path: 'AddTearDown',
        component: () => import('@/views/TearDown/AddTearDown'),
        name: 'AddTearDown',
        meta: { title: 'AddTearDown', noCache: false, roles: ['131-158-1'] }
      },
      {
        path: 'TearDownList',
        component: () => import('@/views/TearDown/TearDownList'),
        name: 'TearDownList',
        meta: { title: 'TearDownList', noCache: true, roles: ['131-159-1', '131-159-2', '131-159-3', '131-159-4', '131-159-5', '131-159-6', '131-159-7', '131-159-18', '131-159-16', '131-159-17'] }
      }
    ]
  },
  {
    path: '/DailyAdjust',
    component: Layout,
    redirect: 'noredirect',
    name: 'DailyAdjust',
    alwaysShow: true,
    meta: {
      title: 'DailyAdjust',
      icon: 'tiaozheng',
      type: 4,
      roles: ['131-161-1', '131-162-4']
    },
    children: [
      {
        path: 'AddDailyAdjust',
        component: () => import('@/views/DailyAdjust/AddDailyAdjust'),
        name: 'AddDailyAdjust',
        meta: { title: 'AddDailyAdjust', noCache: false, roles: ['131-161-1'] }
      },
      {
        path: 'DailyAdjustList',
        component: () => import('@/views/DailyAdjust/DailyAdjustList'),
        name: 'DailyAdjustList',
        meta: { title: 'DailyAdjustList', noCache: true, roles: ['131-162-1', '131-162-2', '131-162-3', '131-162-4', '131-162-5', '131-162-6', '131-162-7', '131-162-18', '131-162-16', '131-162-17'] }
      }
    ]
  },
  {
    path: '/WarehouseAdjust',
    component: Layout,
    redirect: 'noredirect',
    name: 'WarehouseAdjust',
    alwaysShow: true,
    meta: {
      title: 'WarehouseAdjust',
      icon: 'kuwei',
      type: 4,
      roles: ['131-163-165-1', '131-163-164-4', '131-163-166-4', '131-163-167-1', '131-163-168-13', '131-163-169-4', '131-163-170-1']
    },
    children: [
      {
        path: 'AddLocationAdjust',
        component: () => import('@/views/WarehouseAdjust/AddLocationAdjust'),
        name: 'AddLocationAdjust',
        meta: { title: 'AddLocationAdjust', noCache: false, roles: ['131-163-165-1'] }
      },
      {
        path: 'LocationAdjustList',
        component: () => import('@/views/WarehouseAdjust/LocationAdjustList'),
        name: 'LocationAdjustList',
        meta: { title: 'LocationAdjustList', noCache: true, roles: ['131-163-166-1', '131-163-166-2', '131-163-166-3', '131-163-166-4', '131-163-166-5', '131-163-166-6', '131-163-166-7', '131-163-166-18', '131-163-166-16', '131-163-166-17'] }
      },
      {
        path: 'AddInitialenter',
        component: () => import('@/views/WarehouseAdjust/AddInitialenter'),
        name: 'AddInitialenter',
        meta: { title: 'AddInitialenter', noCache: false, roles: ['131-163-167-1'] }
      },
      {
        path: 'Enterlist',
        component: () => import('@/views/WarehouseAdjust/Enterlist'),
        name: 'Enterlist',
        meta: { title: 'Enterlist', noCache: true, roles: ['131-163-166-1', '131-163-166-2', '131-163-166-3', '131-163-166-4', '131-163-166-5', '131-163-166-6', '131-163-166-7', '131-163-166-18', '131-163-166-16', '131-163-166-17'] }
      },
      {
        path: 'AddLocation',
        component: () => import('@/views/WarehouseAdjust/AddLocation'),
        name: 'AddLocation',
        meta: { title: 'AddLocation', noCache: false, roles: ['131-163-170-1'] }
      },
      {
        path: 'Locationlist',
        component: () => import('@/views/WarehouseAdjust/Locationlist'),
        name: 'Locationlist',
        meta: { title: 'Locationlist', noCache: true, roles: ['131-163-169-1', '131-163-169-2', '131-163-169-3', '131-163-169-4', '131-163-169-5', '131-163-169-6', '131-163-169-7', '131-163-169-18', '131-163-169-16', '131-163-169-17'] }
      },
      {
        path: 'Inventorydetaillist',
        component: () => import('@/views/WarehouseAdjust/Inventorydetaillist'),
        name: 'Inventorydetaillist',
        meta: { title: 'Inventorydetaillist', noCache: true }
      }
    ]
  },
  {
    path: '/ProduceRequire',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'shengchanxuqiu',
      type: 7
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/ProduceRequire/index'),
        name: 'ProduceRequire',
        meta: { title: 'ProduceRequire', noCache: true }
      }
    ]
  },
  {
    path: '/MaterialsList',
    component: Layout,
    redirect: 'noredirect',
    name: 'MaterialsList',
    alwaysShow: true,
    meta: {
      title: 'MaterialsList',
      icon: 'wuliao',
      type: 7,
      roles: ['171-175-1', '171-174-4']
    },
    children: [
      {
        path: 'AddMaterialsList',
        component: () => import('@/views/MaterialsList/AddMaterialsList'),
        name: 'AddMaterialsList',
        meta: { title: 'AddMaterialsList', noCache: false, roles: ['171-175-1'] }
      },
      {
        path: 'MaterialsListli',
        component: () => import('@/views/MaterialsList/MaterialsListli'),
        name: 'MaterialsListli',
        meta: { title: 'MaterialsListli', noCache: true, roles: ['171-174-1', '171-174-2', '171-174-3', '171-174-4', '171-174-5', '171-174-6', '171-174-7', '171-174-18', '171-174-71'] }
      }
    ]
  },
  {
    path: '/ProducePlan',
    component: Layout,
    redirect: 'noredirect',
    name: 'ProducePlan',
    alwaysShow: true,
    meta: {
      title: 'ProducePlan',
      icon: 'jihua',
      type: 7,
      roles: ['171-176-4', '171-177-1']
    },
    children: [
      {
        path: 'AddProducePlan',
        component: () => import('@/views/ProducePlan/AddProducePlan'),
        name: 'AddProducePlan',
        meta: { title: 'AddProducePlan', noCache: false, roles: ['171-177-1'] }
      },
      {
        path: 'ProducePlanList',
        component: () => import('@/views/ProducePlan/ProducePlanList'),
        name: 'ProducePlanList',
        meta: { title: 'ProducePlanList', noCache: true, roles: ['171-176-1', '171-176-2', '171-176-3', '171-176-4', '171-176-5', '171-176-6', '171-176-7', '171-176-18', '171-176-16', '171-176-17', '171-176-52', '171-176-53'] }
      }
    ]
  },
  {
    path: '/RequirePlan',
    component: Layout,
    redirect: 'noredirect',
    name: 'RequirePlan',
    alwaysShow: true,
    meta: {
      title: 'RequirePlan',
      icon: 'xuqiu',
      type: 7,
      roles: ['171-179-1', '171-178-4']
    },
    children: [
      {
        path: 'AddRequirePlan',
        component: () => import('@/views/RequirePlan/AddRequirePlan'),
        name: 'AddRequirePlan',
        meta: { title: 'AddRequirePlan', noCache: false, roles: ['171-179-1'] }
      },
      {
        path: 'RequirePlanList',
        component: () => import('@/views/RequirePlan/RequirePlanList'),
        name: 'RequirePlanList',
        meta: { title: 'RequirePlanList', noCache: true, roles: ['171-178-1', '171-178-2', '171-178-3', '171-178-4', '171-178-5', '171-178-6', '171-178-7', '171-178-18', '171-178-16', '171-178-17', '171-178-52', '171-178-24'] }
      }
    ]
  },
  {
    path: '/ProduceTask',
    component: Layout,
    redirect: 'noredirect',
    name: 'ProduceTask',
    alwaysShow: true,
    meta: {
      title: 'ProduceTask',
      icon: 'renwu',
      type: 7,
      roles: ['171-180-181-4', '171-180-182-1', '171-180-183-4', '171-180-184-1']
    },
    children: [
      {
        path: 'AddProduceTask',
        component: () => import('@/views/ProduceTask/AddProduceTask'),
        name: 'AddProduceTask',
        meta: { title: 'AddProduceTask', noCache: false, roles: ['171-180-182-1'] }
      },
      {
        path: 'ProduceTaskList',
        component: () => import('@/views/ProduceTask/ProduceTaskList'),
        name: 'ProduceTaskList',
        meta: { title: 'ProduceTaskList', noCache: true, roles: ['171-180-181-1', '171-180-181-2', '171-180-181-3', '171-180-181-4', '171-180-181-5', '171-180-181-6', '171-180-181-7', '171-180-181-18', '171-180-181-16', '171-180-181-17', '171-180-181-54'] }
      },
      {
        path: 'AddProduceReport',
        component: () => import('@/views/ProduceTask/AddProduceReport'),
        name: 'AddProduceReport',
        meta: { title: 'AddProduceReport', noCache: false, roles: ['171-180-184-1'] }
      },
      {
        path: 'ProduceReportList',
        component: () => import('@/views/ProduceTask/ProduceReportList'),
        name: 'ProduceReportList',
        meta: { title: 'ProduceReportList', noCache: true, roles: ['171-180-183-1', '171-180-183-2', '171-180-183-3', '171-180-183-4', '171-180-183-5', '171-180-183-6', '171-180-183-7', '171-180-183-18', '171-180-183-16', '171-180-183-17'] }
      }
    ]
  },
  {
    path: '/AccessMaterials',
    component: Layout,
    redirect: 'noredirect',
    name: 'AccessMaterials',
    alwaysShow: true,
    meta: {
      title: 'AccessMaterials',
      icon: 'lingliao',
      type: 7,
      roles: ['171-185-186-4', '171-185-187-1', '171-185-188-4', '171-185-189-1']
    },
    children: [
      {
        path: 'AddAccessMaterials',
        component: () => import('@/views/AccessMaterials/AddAccessMaterials'),
        name: 'AddAccessMaterials',
        meta: { title: 'AddAccessMaterials', noCache: false, roles: ['171-185-187-1'] }
      },
      {
        path: 'AccessMaterialsList',
        component: () => import('@/views/AccessMaterials/AccessMaterialsList'),
        name: 'AccessMaterialsList',
        meta: { title: 'AccessMaterialsList', noCache: true, roles: ['171-185-186-1', '171-185-186-2', '171-185-186-3', '171-185-186-4', '171-185-186-5', '171-185-186-6', '171-185-186-7', '171-185-186-18', '171-185-186-16', '171-185-186-17', '171-185-186-72', '171-185-186-55'] }
      },
      {
        path: 'AddRetreatMaterials',
        component: () => import('@/views/AccessMaterials/AddRetreatMaterials'),
        name: 'AddRetreatMaterials',
        meta: { title: 'AddRetreatMaterials', noCache: false, roles: ['171-185-189-1'] }
      },
      {
        path: 'RetreatMaterialsList',
        component: () => import('@/views/AccessMaterials/RetreatMaterialsList'),
        name: 'RetreatMaterialsList',
        meta: { title: 'RetreatMaterialsList', noCache: true, roles: ['171-185-188-1', '171-185-188-2', '171-185-188-3', '171-185-188-4', '171-185-188-5', '171-185-188-6', '171-185-188-7', '171-185-188-18', '171-185-188-16', '171-185-188-17', '171-185-188-73'] }
      }
    ]
  },
  {
    path: '/ProcessFile',
    component: Layout,
    redirect: 'noredirect',
    name: 'ProcessFile',
    alwaysShow: true,
    meta: {
      title: 'ProcessFile',
      icon: 'dangan',
      type: 7,
      roles: ['171-190-191-4', '171-190-192-1', '171-190-193-4', '171-190-194-1', '171-190-195-4', '171-190-196-1']
    },
    children: [
      {
        path: 'AddWorkCenter',
        component: () => import('@/views/ProcessFile/AddWorkCenter'),
        name: 'AddWorkCenter',
        meta: { title: 'AddWorkCenter', noCache: false, roles: ['171-190-192-1'] }
      },
      {
        path: 'WorkCenter',
        component: () => import('@/views/ProcessFile/WorkCenter'),
        name: 'WorkCenter',
        meta: { title: 'WorkCenter', noCache: true, roles: ['171-190-191-1', '171-190-191-2', '171-190-191-3', '171-190-191-4', '171-190-191-5', '171-190-191-6', '171-190-191-7'] }
      },
      {
        path: 'AddProductionFile',
        component: () => import('@/views/ProcessFile/AddProductionFile'),
        name: 'AddProductionFile',
        meta: { title: 'AddProductionFile', noCache: false, roles: ['171-190-194-1'] }
      },
      {
        path: 'ProductionFile',
        component: () => import('@/views/ProcessFile/ProductionFile'),
        name: 'ProductionFile',
        meta: { title: 'ProductionFile', noCache: true, roles: ['171-190-193-1', '171-190-193-2', '171-190-193-3', '171-190-193-4', '171-190-193-5', '171-190-193-6', '171-190-193-7'] }
      },
      {
        path: 'AddStandardProcess',
        component: () => import('@/views/ProcessFile/AddStandardProcess'),
        name: 'AddStandardProcess',
        meta: { title: 'AddStandardProcess', noCache: false, roles: ['171-190-196-1'] }
      },
      {
        path: 'StandardProcess',
        component: () => import('@/views/ProcessFile/StandardProcess'),
        name: 'StandardProcess',
        meta: { title: 'StandardProcess', noCache: true, roles: ['171-190-195-1', '171-190-195-2', '171-190-195-3', '171-190-195-4', '171-190-195-5', '171-190-195-6', '171-190-195-7'] }
      }
    ]
  },
  {
    path: '/OutFactory',
    component: Layout,
    redirect: 'noredirect',
    name: 'OutFactory',
    alwaysShow: true,
    meta: {
      title: 'OutFactory',
      icon: 'waibao',
      type: 7,
      roles: ['171-190-197-4', '171-190-198-1']
    },
    children: [
      {
        path: 'AddOutFactory',
        component: () => import('@/views/OutFactory/AddOutFactory'),
        name: 'AddOutFactory',
        meta: { title: 'AddOutFactory', noCache: false, roles: ['171-190-198-1'] }
      },
      {
        path: 'OutFactoryList',
        component: () => import('@/views/OutFactory/OutFactoryList'),
        name: 'OutFactoryList',
        meta: { title: 'OutFactoryList', noCache: true, roles: ['171-190-197-1', '171-190-197-2', '171-190-197-3', '171-190-197-4', '171-190-197-5', '171-190-197-6', '171-190-197-7', '171-190-197-18'] }
      }
    ]
  },
  {
    path: '/OutSourcing',
    component: Layout,
    redirect: 'noredirect',
    name: 'OutSourcing',
    alwaysShow: true,
    meta: {
      title: 'OutSourcing',
      icon: 'waibaodan',
      type: 7,
      roles: ['171-190-199-4']
    },
    children: [
      {
        path: 'AddOutSourcing',
        component: () => import('@/views/OutSourcing/AddOutSourcing'),
        name: 'AddOutSourcing',
        meta: { title: 'AddOutSourcing', noCache: false }
      },
      {
        path: 'OutSourcingList',
        component: () => import('@/views/OutSourcing/OutSourcingList'),
        name: 'OutSourcingList',
        meta: { title: 'OutSourcingList', noCache: true, roles: ['171-190-199-1', '171-190-199-2', '171-190-199-3', '171-190-199-4', '171-190-199-5', '171-190-199-6', '171-190-199-7', '171-190-199-18', '171-190-199-56', '171-190-199-57'] }
      }
    ]
  },
  {
    path: '/StockApply',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockApply',
    alwaysShow: true,
    meta: {
      title: 'StockApply',
      icon: 'shenqing',
      type: 2,
      roles: ['104-105-4', '104-106-1']
    },
    children: [
      {
        path: 'AddStockApply',
        component: () => import('@/views/StockApply/AddStockApply'),
        name: 'AddStockApply',
        meta: { title: 'AddStockApply', noCache: false, roles: ['104-106-1'] }
      },
      {
        path: 'StockApplyList',
        component: () => import('@/views/StockApply/StockApplyList'),
        name: 'StockApplyList',
        meta: { title: 'StockApplyList', noCache: true, roles: ['104-105-1', '104-105-2', '104-105-3', '104-105-4', '104-105-5', '104-105-6', '104-105-7', '104-105-18', '104-105-16', '104-105-17', '104-105-40'] }
      }
    ]
  },
  {
    path: '/StockRequire',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'caigouxuqiu',
      type: 2,
      roles: ['104-107-4']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/StockRequire/index'),
        name: 'StockRequire',
        meta: { title: 'StockRequire', noCache: true, roles: ['104-107-2', '104-107-4', '104-107-6', '104-107-7', '104-107-41'] }
      }
    ]
  },
  {
    path: '/StockPlan',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockPlan',
    alwaysShow: true,
    meta: {
      title: 'StockPlan',
      icon: 'caigoujihua',
      type: 2,
      roles: ['104-108-4', '104-109-1']
    },
    children: [
      {
        path: 'AddStockPlan',
        component: () => import('@/views/StockPlan/AddStockPlan'),
        name: 'AddStockPlan',
        meta: { title: 'AddStockPlan', noCache: false, roles: ['104-109-1'] }
      },
      {
        path: 'StockPlanList',
        component: () => import('@/views/StockPlan/StockPlanList'),
        name: 'StockPlanList',
        meta: { title: 'StockPlanList', noCache: true, roles: ['104-108-1', '104-108-2', '104-108-3', '104-108-4', '104-108-5', '104-108-6', '104-108-7', '104-108-18', '104-108-16', '104-108-17'] }
      }
    ]
  },
  {
    path: '/StockInquiry',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockInquiry',
    alwaysShow: true,
    meta: {
      title: 'StockInquiry',
      icon: 'xunjia',
      type: 2,
      roles: ['104-110-4', '104-111-1']
    },
    children: [
      {
        path: 'AddStockInquiry',
        component: () => import('@/views/StockInquiry/AddStockInquiry'),
        name: 'AddStockInquiry',
        meta: { title: 'AddStockInquiry', noCache: false, roles: ['104-111-1'] }
      },
      {
        path: 'StockInquiryList',
        component: () => import('@/views/StockInquiry/StockInquiryList'),
        name: 'StockInquiryList',
        meta: { title: 'StockInquiryList', noCache: true, roles: ['104-110-1', '104-110-2', '104-110-3', '104-110-4', '104-110-5', '104-110-6', '104-110-7', '104-110-18', '104-110-16', '104-110-17', '104-110-42'] }
      }
    ]
  },
  {
    path: '/StockContract',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockContract',
    alwaysShow: true,
    meta: {
      title: 'StockContract',
      icon: 'caigouhetong',
      type: 2,
      roles: ['104-112-4', '104-113-1']
    },
    children: [
      {
        path: 'AddStockContract',
        component: () => import('@/views/StockContract/AddStockContract'),
        name: 'AddStockContract',
        meta: { title: 'AddStockContract', noCache: false, roles: ['104-113-1'] }
      },
      {
        path: 'StockContractList',
        component: () => import('@/views/StockContract/StockContractList'),
        name: 'StockContractList',
        meta: { title: 'StockContractList', noCache: true, roles: ['104-112-1', '104-112-2', '104-112-3', '104-112-4', '104-112-5', '104-112-6', '104-112-7', '104-112-18', '104-112-16', '104-112-17', '104-112-43'] }
      }
    ]
  },
  {
    path: '/StockOrder',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockOrder',
    alwaysShow: true,
    meta: {
      title: 'StockOrder',
      icon: 'caigoudingdan',
      type: 2,
      roles: ['104-114-4', '104-115-1']
    },
    children: [
      {
        path: 'AddStockOrder',
        component: () => import('@/views/StockOrder/AddStockOrder'),
        name: 'AddStockOrder',
        meta: { title: 'AddStockOrder', noCache: false, roles: ['104-115-1'] }
      },
      {
        path: 'StockOrderList',
        component: () => import('@/views/StockOrder/StockOrderList'),
        name: 'StockOrderList',
        meta: { title: 'StockOrderList', noCache: true, roles: ['104-114-1', '104-114-2', '104-114-3', '104-114-4', '104-114-5', '104-114-6', '104-114-7', '104-114-18', '104-114-16', '104-114-17', '104-114-44'] }
      }
    ]
  },
  {
    path: '/StockArrival',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockArrival',
    alwaysShow: true,
    meta: {
      title: 'StockArrival',
      icon: 'caigoudaohuo',
      type: 2,
      roles: ['104-116-4', '104-117-1']
    },
    children: [
      {
        path: 'AddStockArrival',
        component: () => import('@/views/StockArrival/AddStockArrival'),
        name: 'AddStockArrival',
        meta: { title: 'AddStockArrival', noCache: false, roles: ['104-117-1'] }
      },
      {
        path: 'StockArrivalList',
        component: () => import('@/views/StockArrival/StockArrivalList'),
        name: 'StockArrivalList',
        meta: { title: 'StockArrivalList', noCache: true, roles: ['104-116-1', '104-116-2', '104-116-3', '104-116-4', '104-116-5', '104-116-6', '104-116-7', '104-116-18', '104-116-16', '104-116-17', '104-116-45', '104-116-46', '104-116-47', '104-116-48'] }
      }
    ]
  },
  {
    path: '/StockRetreat',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockRetreat',
    alwaysShow: true,
    meta: {
      title: 'StockRetreat',
      icon: 'caigoutuihuo',
      type: 2,
      roles: ['104-118-4', '104-119-1']
    },
    children: [
      {
        path: 'AddStockRetreat',
        component: () => import('@/views/StockRetreat/AddStockRetreat'),
        name: 'AddStockRetreat',
        meta: { title: 'AddStockRetreat', noCache: false, roles: ['104-119-1'] }
      },
      {
        path: 'StockRetreatList',
        component: () => import('@/views/StockRetreat/StockRetreatList'),
        name: 'StockRetreatList',
        meta: { title: 'StockRetreatList', noCache: true, roles: ['104-118-1', '104-118-2', '104-118-3', '104-118-4', '104-118-5', '104-118-6', '104-118-7', '104-118-18', '104-118-16', '104-118-17', '104-118-66'] }
      }
    ]
  },
  {
    path: '/StockQuery',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockQuery',
    alwaysShow: true,
    meta: {
      title: 'StockQuery',
      icon: 'caigouchaxun',
      type: 2,
      roles: ['104-120-121-4', '104-120-122-4', '104-120-123-4', '104-120-124-4']
    },
    children: [
      {
        path: 'StockPrice',
        component: () => import('@/views/StockQuery/StockPrice'),
        name: 'StockPrice',
        meta: { title: 'StockPrice', noCache: true, roles: ['104-120-121-8', '104-120-121-9', '104-120-121-4', '104-120-121-5'] }
      },
      {
        path: 'StockCount',
        component: () => import('@/views/StockQuery/StockCount'),
        name: 'StockCount',
        meta: { title: 'StockCount', noCache: true, roles: ['104-120-122-8', '104-120-122-9', '104-120-122-4'] }
      },
      {
        path: 'ArrivalSummary',
        component: () => import('@/views/StockQuery/ArrivalSummary'),
        name: 'ArrivalSummary',
        meta: { title: 'ArrivalSummary', noCache: true, roles: ['104-120-123-8', '104-120-123-9', '104-120-123-4'] }
      },
      {
        path: 'OnSummary',
        component: () => import('@/views/StockQuery/OnSummary'),
        name: 'OnSummary',
        meta: { title: 'OnSummary', noCache: true, roles: ['104-120-124-8', '104-120-124-9', '104-120-124-4'] }
      }
    ]
  },
  {
    path: '/payment',
    component: Layout,
    redirect: 'noredirect',
    name: 'payment',
    alwaysShow: true,
    meta: {
      title: 'payment',
      icon: 'fukuandan',
      type: 2,
      roles: ['104-126-4', '104-127-1']
    },
    children: [
      {
        path: 'AddPayment',
        component: () => import('@/views/payment/AddPayment'),
        name: 'AddPayment',
        meta: { title: 'AddPayment', noCache: false, roles: ['104-127-1'] }
      },
      {
        path: 'paymentList',
        component: () => import('@/views/payment/paymentList'),
        name: 'paymentList',
        meta: { title: 'paymentList', noCache: true, roles: ['104-126-1', '104-126-2', '104-126-3', '104-126-4', '104-126-5', '104-126-6', '104-126-7', '104-126-16', '104-126-17', '104-126-18'] }
      }
    ]
  },
  {
    path: '/ShouldPayList',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'yingfukuan',
      type: 2,
      roles: ['104-127-1', '104-128-6', '104-128-4', '104-128-7', '104-128-67', '104-128-5']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/ShouldPayList/index'),
        name: 'ShouldPayList',
        meta: { title: 'ShouldPayList', noCache: true }
      }
    ]
  },
  {
    path: '/StockCategory',
    component: Layout,
    redirect: 'noredirect',
    name: 'StockCategory',
    alwaysShow: true,
    meta: {
      title: 'StockCategory',
      icon: 'shuxing',
      type: 2,
      roles: ['104-125-1', '104-125-2', '104-125-3', '104-125-4', '104-125-5', '104-125-6', '104-125-7']
    },
    children: [
      {
        path: 'StockCategoryList',
        component: () => import('@/views/StockCategory/StockCategoryList'),
        name: 'StockCategoryList',
        meta: { title: 'StockCategoryList', noCache: true }
      }
    ]
  },
  {
    path: '/AdvancePay',
    component: Layout,
    redirect: 'noredirect',
    name: 'AdvancePay',
    alwaysShow: true,
    meta: {
      title: 'AdvancePay',
      icon: 'yufukuan',
      type: 2
    },
    children: [
      {
        path: 'AddAdvancePay',
        component: () => import('@/views/AdvancePay/AddAdvancePay'),
        name: 'AddAdvancePay',
        meta: { title: 'AddAdvancePay', noCache: false }
      },
      {
        path: 'AdvancePayList',
        component: () => import('@/views/AdvancePay/AdvancePayList'),
        name: 'AdvancePayList',
        meta: { title: 'AdvancePayList', noCache: true }
      }
    ]
  },
  {
    path: '/Invoice',
    component: Layout,
    redirect: 'noredirect',
    name: 'Invoice',
    alwaysShow: true,
    meta: {
      title: 'Invoice',
      icon: 'fapiao',
      type: 2,
      roles: ['104-129-4', '104-130-1']
    },
    children: [
      {
        path: 'AddInvoice',
        component: () => import('@/views/Invoice/AddInvoice'),
        name: 'AddInvoice',
        meta: { title: 'AddInvoice', noCache: false, roles: ['104-130-1'] }
      },
      {
        path: 'InvoiceList',
        component: () => import('@/views/Invoice/InvoiceList'),
        name: 'InvoiceList',
        meta: { title: 'InvoiceList', noCache: true, roles: ['104-129-1', '104-129-2', '104-129-3', '104-129-4', '104-129-5', '104-129-6', '104-129-7', '104-129-18'] }
      }
    ]
  },
  {
    path: '/SaleOut',
    component: Layout,
    redirect: 'noredirect',
    name: 'SaleOut',
    alwaysShow: true,
    meta: {
      title: 'SaleOut',
      icon: 'xiaoshoudingdan',
      type: 3,
      roles: ['54-55-4', '54-56-1']
    },
    children: [
      {
        path: 'AddSaleOut',
        component: () => import('@/views/SaleOut/AddSaleOut'),
        name: 'AddSaleOut',
        meta: { title: 'AddSaleOut', noCache: false, roles: ['54-56-1'] }
      },
      {
        path: 'SaleOutList',
        component: () => import('@/views/SaleOut/SaleOutList'),
        name: 'SaleOutList',
        meta: { title: 'SaleOutList', noCache: true, roles: ['54-55-1', '54-55-2', '54-55-3', '54-55-4', '54-55-5', '54-55-6', '54-55-7', '54-55-18', '54-55-49', '54-55-20', '54-55-16', '54-55-17', '54-55-21'] }
      }
    ]
  },
  {
    path: '/SaleOrder',
    component: Layout,
    redirect: 'noredirect',
    name: 'SaleOrder',
    alwaysShow: true,
    meta: {
      title: 'SaleOrder',
      icon: 'xiaoshoudingdan',
      type: 3,
      roles: ['54-57-4', '54-58-1']
    },
    children: [
      {
        path: 'AddSaleOrder',
        component: () => import('@/views/SaleOrder/AddSaleOrder'),
        name: 'AddSaleOrder',
        meta: { title: 'AddSaleOrder', noCache: false, roles: ['54-58-1'] }
      },
      {
        path: 'SaleOrderList',
        component: () => import('@/views/SaleOrder/SaleOrderList'),
        name: 'SaleOrderList',
        meta: { title: 'SaleOrderList', noCache: true, roles: ['54-57-1', '54-57-2', '54-57-3', '54-57-4', '54-57-5', '54-57-6', '54-57-7', '54-57-18', '54-57-22', '54-57-23', '54-57-24', '54-57-25', '54-57-26'] }
      }
    ]
  },
  {
    path: '/SaleReturn',
    component: Layout,
    redirect: 'noredirect',
    name: 'SaleReturn',
    alwaysShow: true,
    meta: {
      title: 'SaleReturn',
      icon: 'tuihuo',
      type: 3,
      roles: ['54-59-4', '54-60-1']
    },
    children: [
      {
        path: 'AddSaleReturn',
        component: () => import('@/views/SaleReturn/AddSaleReturn'),
        name: 'AddSaleReturn',
        meta: { title: 'AddSaleReturn', noCache: false, roles: ['54-60-1'] }
      },
      {
        path: 'SaleReturnList',
        component: () => import('@/views/SaleReturn/SaleReturnList'),
        name: 'SaleReturnList',
        meta: { title: 'SaleReturnList', noCache: true, roles: ['54-59-1', '54-59-2', '54-59-3', '54-59-4', '54-59-5', '54-59-6', '54-59-7', '54-59-18', '54-59-16', '54-59-17'] }
      }
    ]
  },
  {
    path: '/SalePlan',
    component: Layout,
    redirect: 'noredirect',
    name: 'SalePlan',
    alwaysShow: true,
    meta: {
      title: 'SalePlan',
      icon: 'xiaoshoujihua',
      type: 3,
      roles: ['54-61-4', '54-62-1']
    },
    children: [
      {
        path: 'AddSalePlan',
        component: () => import('@/views/SalePlan/AddSalePlan'),
        name: 'AddSalePlan',
        meta: { title: 'AddSalePlan', noCache: false, roles: ['54-62-1'] }
      },
      {
        path: 'SalePlanList',
        component: () => import('@/views/SalePlan/SalePlanList'),
        name: 'SalePlanList',
        meta: { title: 'SalePlanList', noCache: true, roles: ['54-61-1', '54-61-2', '54-61-3', '54-61-4', '54-61-5', '54-61-6', '54-61-7', '54-61-18'] }
      }
    ]
  },
  {
    path: '/SaleOpportunity',
    component: Layout,
    redirect: 'noredirect',
    name: 'SaleOpportunity',
    alwaysShow: true,
    meta: {
      title: 'SaleOpportunity',
      icon: 'xiaoshoujihui',
      type: 3,
      roles: ['54-63-4', '54-64-1']
    },
    children: [
      {
        path: 'AddSaleOpportunity',
        component: () => import('@/views/SaleOpportunity/AddSaleOpportunity'),
        name: 'AddSaleOpportunity',
        meta: { title: 'AddSaleOpportunity', noCache: false, roles: ['54-64-1'] }
      },
      {
        path: 'SaleOpportunityList',
        component: () => import('@/views/SaleOpportunity/SaleOpportunityList'),
        name: 'SaleOpportunityList',
        meta: { title: 'SaleOpportunityList', noCache: true, roles: ['54-63-1', '54-63-2', '54-63-3', '54-63-4', '54-63-5', '54-63-6', '54-63-7', '54-63-18'] }
      }
    ]
  },
  {
    path: '/SaleContract',
    component: Layout,
    redirect: 'noredirect',
    name: 'SaleContract',
    alwaysShow: true,
    meta: {
      title: 'SaleContract',
      icon: 'xiaoshouhetong',
      type: 3,
      roles: ['54-65-4', '54-66-1']
    },
    children: [
      {
        path: 'AddSaleContract',
        component: () => import('@/views/SaleContract/AddSaleContract'),
        name: 'AddSaleContract',
        meta: { title: 'AddSaleContract', noCache: false, roles: ['54-66-1'] }
      },
      {
        path: 'SaleContractList',
        component: () => import('@/views/SaleContract/SaleContractList'),
        name: 'SaleContractList',
        meta: { title: 'SaleContractList', noCache: true, roles: ['54-65-1', '54-65-2', '54-65-3', '54-65-4', '54-65-5', '54-65-6', '54-65-7', '54-65-18', '54-65-65'] }
      }
    ]
  },
  {
    path: '/income',
    component: Layout,
    redirect: 'noredirect',
    name: 'income',
    alwaysShow: true,
    meta: {
      title: 'income',
      icon: 'shourudan',
      type: 3,
      roles: ['54-90-4', '54-91-1']
    },
    children: [
      {
        path: 'AddIncome',
        component: () => import('@/views/income/AddIncome'),
        name: 'AddIncome',
        meta: { title: 'AddIncome', noCache: false, roles: ['54-91-1'] }
      },
      {
        path: 'IncomeList',
        component: () => import('@/views/income/IncomeList'),
        name: 'IncomeList',
        meta: { title: 'IncomeList', noCache: true, roles: ['54-90-1', '54-90-2', '54-90-3', '54-90-4', '54-90-5', '54-90-6', '54-90-7', '54-90-18', '54-90-16', '54-90-17'] }
      }
    ]
  },
  {
    path: '/Expenses',
    component: Layout,
    redirect: 'noredirect',
    name: 'Expenses',
    alwaysShow: true,
    meta: {
      title: 'Expenses',
      icon: 'zhichudan',
      type: 3,
      roles: ['54-92-4', '54-93-1']
    },
    children: [
      {
        path: 'AddExpenses',
        component: () => import('@/views/Expenses/AddExpenses'),
        name: 'AddExpenses',
        meta: { title: 'AddExpenses', noCache: false, roles: ['54-93-1'] }
      },
      {
        path: 'ExpensesList',
        component: () => import('@/views/Expenses/ExpensesList'),
        name: 'ExpensesList',
        meta: { title: 'ExpensesList', noCache: true, roles: ['54-92-1', '54-92-2', '54-92-3', '54-92-4', '54-92-5', '54-92-6', '54-92-7', '54-92-18', '54-92-16', '54-92-17'] }
      }
    ]
  },
  {
    path: '/Transfer',
    component: Layout,
    redirect: 'noredirect',
    name: 'Transfer',
    alwaysShow: true,
    meta: {
      title: 'Transfer',
      icon: 'zhuanzhang',
      type: 3,
      roles: ['54-94-4', '54-95-1']
    },
    children: [
      {
        path: 'AddTransfer',
        component: () => import('@/views/Transfer/AddTransfer'),
        name: 'AddTransfer',
        meta: { title: 'AddTransfer', noCache: false, roles: ['54-95-1'] }
      },
      {
        path: 'TransferList',
        component: () => import('@/views/Transfer/TransferList'),
        name: 'TransferList',
        meta: { title: 'TransferList', noCache: true, roles: ['54-94-1', '54-94-2', '54-94-3', '54-94-4', '54-94-5', '54-94-6', '54-94-7', '54-94-18', '54-94-16', '54-94-17'] }
      }
    ]
  },
  {
    path: '/ReturnExchange',
    component: Layout,
    redirect: 'noredirect',
    name: 'ReturnExchange',
    alwaysShow: true,
    meta: {
      title: 'ReturnExchange',
      icon: 'huanhuo',
      type: 3
    },
    children: [
      {
        path: 'AddReturnExchange',
        component: () => import('@/views/ReturnExchange/AddReturnExchange'),
        name: 'AddReturnExchange',
        meta: { title: 'AddReturnExchange', noCache: false }
      },
      {
        path: 'ReturnExchangeList',
        component: () => import('@/views/ReturnExchange/ReturnExchangeList'),
        name: 'ReturnExchangeList',
        meta: { title: 'ReturnExchangeList', noCache: true }
      }
    ]
  },
  {
    path: '/AgentCollect',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'yingshoukuan',
      type: 3
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/AgentCollect/index'),
        name: 'AgentCollect',
        meta: { title: 'AgentCollect', noCache: true }
      }
    ]
  },
  {
    path: '/Recycling',
    component: Layout,
    redirect: 'noredirect',
    name: 'Recycling',
    alwaysShow: true,
    meta: {
      title: 'Recycling',
      icon: 'ershouhuishou',
      type: 3,
      roles: ['54-96-4', '54-97-1']
    },
    children: [
      {
        path: 'AddRecycling',
        component: () => import('@/views/Recycling/AddRecycling'),
        name: 'AddRecycling',
        meta: { title: 'AddRecycling', noCache: false, roles: ['54-97-1'] }
      },
      {
        path: 'RecyclingList',
        component: () => import('@/views/Recycling/RecyclingList'),
        name: 'RecyclingList',
        meta: { title: 'RecyclingList', noCache: true, roles: ['54-96-1', '54-96-2', '54-96-3', '54-96-4', '54-96-5', '54-96-6', '54-96-7', '54-96-18', '54-96-16', '54-96-17'] }
      }
    ]
  },
  {
    path: '/PrepReceipt',
    component: Layout,
    redirect: 'noredirect',
    name: 'PrepReceipt',
    alwaysShow: true,
    meta: {
      title: 'PrepReceipt',
      icon: 'yushoukuan',
      type: 3,
      roles: ['54-98-4', '54-99-1']
    },
    children: [
      {
        path: 'AddPrepReceipt',
        component: () => import('@/views/PrepReceipt/AddPrepReceipt'),
        name: 'AddPrepReceipt',
        meta: { title: 'AddPrepReceipt', noCache: false, roles: ['54-99-1'] }
      },
      {
        path: 'PrepReceiptList',
        component: () => import('@/views/PrepReceipt/PrepReceiptList'),
        name: 'PrepReceiptList',
        meta: { title: 'PrepReceiptList', noCache: true, roles: ['54-98-1', '54-98-2', '54-98-3', '54-98-4', '54-98-5', '54-98-6', '54-98-7', '54-98-18', '54-98-16', '54-98-17', '54-98-38'] }
      }
    ]
  },
  {
    path: '/Advancemanage',
    component: Layout,
    redirect: 'noredirect',
    name: 'Advancemanage',
    alwaysShow: true,
    meta: {
      title: 'Advancemanage',
      icon: 'yushou',
      type: 3,
      roles: ['54-84-87-4', '54-84-88-1', '54-84-85-1', '54-84-86-4', '54-84-89-4']
    },
    children: [
      {
        path: 'AddAdvanceProduct',
        component: () => import('@/views/Advancemanage/AddAdvanceProduct'),
        name: 'AddAdvanceProduct',
        meta: { title: 'AddAdvanceProduct', noCache: false, roles: ['54-84-88-1'] }
      },
      {
        path: 'AdvanceProductList',
        component: () => import('@/views/Advancemanage/AdvanceProductList'),
        name: 'AdvanceProductList',
        meta: { title: 'AdvanceProductList', noCache: true, roles: ['54-84-87-1', '54-84-87-2', '54-84-87-3', '54-84-87-4', '54-84-87-5', '54-84-87-6', '54-84-87-7', '54-84-87-18'] }
      },
      {
        path: 'AddAdvanceOrder',
        component: () => import('@/views/Advancemanage/AddAdvanceOrder'),
        name: 'AddAdvanceOrder',
        meta: { title: 'AddAdvanceOrder', noCache: false, roles: ['54-84-85-1'] }
      },
      {
        path: 'AdvanceOrderList',
        component: () => import('@/views/Advancemanage/AdvanceOrderList'),
        name: 'AdvanceOrderList',
        meta: { title: 'AdvanceOrderList', noCache: true, roles: ['54-84-86-1', '54-84-86-2', '54-84-86-3', '54-84-86-4', '54-84-86-5', '54-84-86-6', '54-84-86-7', '54-84-86-18', '54-84-86-22', '54-84-86-37', '54-84-86-26', '54-84-86-16', '54-84-86-17'] }
      },
      {
        path: 'AddPrepReturn',
        component: () => import('@/views/Advancemanage/AddPrepReturn'),
        name: 'AddPrepReturn',
        meta: { title: 'AddPrepReturn', noCache: false }
      },
      {
        path: 'PrepReturnList',
        component: () => import('@/views/Advancemanage/PrepReturnList'),
        name: 'PrepReturnList',
        meta: { title: 'PrepReturnList', noCache: true, roles: ['54-84-89-1', '54-84-89-2', '54-84-89-3', '54-84-89-4', '54-84-89-5', '54-84-89-6', '54-84-89-7', '54-84-89-18', '54-84-89-16', '54-84-89-17'] }
      }
    ]
  },
  {
    path: '/SaleCategory',
    component: Layout,
    redirect: 'noredirect',
    name: 'SaleCategory',
    alwaysShow: true,
    meta: {
      title: 'SaleCategory',
      icon: 'shuxing',
      type: 3,
      roles: ['54-67-83-4']
    },
    children: [
      {
        path: 'SaleCategoryList',
        component: () => import('@/views/SaleCategory/SaleCategoryList'),
        name: 'SaleCategoryList',
        meta: { title: 'SaleCategoryList', noCache: true, roles: ['54-67-83-1', '54-67-83-2', '54-67-83-3', '54-67-83-5', '54-67-83-6', '54-67-83-7'] }
      }
    ]
  },
  {
    path: '/SmartReplenishment',
    component: Layout,
    redirect: 'noredirect',
    name: 'SmartReplenishment',
    alwaysShow: true,
    meta: {
      title: 'SmartReplenishment',
      icon: 'zhinengbuhuo',
      type: 3,
      roles: ['54-102-4']
    },
    children: [
      {
        path: 'SmartReplenishmentList',
        component: () => import('@/views/SmartReplenishment/SmartReplenishmentList'),
        name: 'SmartReplenishmentList',
        meta: { title: 'SmartReplenishmentList', noCache: true, roles: ['54-102-2', '54-102-6', '54-102-7', '54-102-39'] }
      }
    ]
  },
  {
    path: '/QualityCheck',
    component: Layout,
    redirect: 'noredirect',
    name: 'QualityCheck',
    alwaysShow: true,
    meta: {
      title: 'QualityCheck',
      icon: 'zhijian',
      type: 8
    },
    children: [
      {
        path: 'AddQualityCheck',
        component: () => import('@/views/QualityCheck/AddQualityCheck'),
        name: 'AddQualityCheck',
        meta: { title: 'AddQualityCheck', noCache: false }
      },
      {
        path: 'QualityCheckList',
        component: () => import('@/views/QualityCheck/QualityCheckList'),
        name: 'QualityCheckList',
        meta: { title: 'QualityCheckList', noCache: true }
      }
    ]
  },
  {
    path: '/CheckReport',
    component: Layout,
    redirect: 'noredirect',
    name: 'CheckReport',
    alwaysShow: true,
    meta: {
      title: 'CheckReport',
      icon: 'zhijianbaogao',
      type: 8
    },
    children: [
      {
        path: 'AddCheckReport',
        component: () => import('@/views/CheckReport/AddCheckReport'),
        name: 'AddCheckReport',
        meta: { title: 'AddCheckReport', noCache: false }
      },
      {
        path: 'CheckReportList',
        component: () => import('@/views/CheckReport/CheckReportList'),
        name: 'CheckReportList',
        meta: { title: 'CheckReportList', noCache: true }
      }
    ]
  },
  {
    path: '/CheckFail',
    component: Layout,
    redirect: 'noredirect',
    name: 'CheckFail',
    alwaysShow: true,
    meta: {
      title: 'CheckFail',
      icon: 'zhijianbaogao',
      type: 8
    },
    children: [
      {
        path: 'AddCheckFail',
        component: () => import('@/views/CheckFail/AddCheckFail'),
        name: 'AddCheckFail',
        meta: { title: 'AddCheckFail', noCache: false }
      },
      {
        path: 'CheckFailList',
        component: () => import('@/views/CheckFail/CheckFailList'),
        name: 'CheckFailList',
        meta: { title: 'CheckFailList', noCache: true }
      }
    ]
  },
  {
    path: '/CheckCategory',
    component: Layout,
    redirect: 'noredirect',
    name: 'CheckCategory',
    alwaysShow: true,
    meta: {
      title: 'CheckCategory',
      icon: 'shuxing',
      type: 8
    },
    children: [
      {
        path: 'CheckCategoryList',
        component: () => import('@/views/CheckCategory/CheckCategoryList'),
        name: 'CheckCategoryList',
        meta: { title: 'CheckCategoryList', noCache: true }
      }
    ]
  },
  // {
  //   path: '/SendCar',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'SendCar',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'SendCar',
  //     icon: 'paiche',
  //     type: 9
  //   },
  //   children: [
  //     {
  //       path: 'Addsendcar',
  //       component: () => import('@/views/LogisticsCar/Addsendcar'),
  //       name: 'Addsendcar',
  //       meta: { title: 'Addsendcar', noCache: false }
  //     },
  //     {
  //       path: 'SendcarList',
  //       component: () => import('@/views/LogisticsCar/SendcarList'),
  //       name: 'SendcarList',
  //       meta: { title: 'SendcarList', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/ReturnCar',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ReturnCar',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'ReturnCar',
  //     icon: 'huiche',
  //     type: 9
  //   },
  //   children: [
  //     {
  //       path: 'Addreturncar',
  //       component: () => import('@/views/LogisticsCar/Addreturncar'),
  //       name: 'Addreturncar',
  //       meta: { title: 'Addreturncar', noCache: false }
  //     },
  //     {
  //       path: 'ReturncarList',
  //       component: () => import('@/views/LogisticsCar/ReturncarList'),
  //       name: 'ReturncarList',
  //       meta: { title: 'ReturncarList', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/DeliverGoods',
    component: Layout,
    redirect: 'noredirect',
    name: 'DeliverGoods',
    alwaysShow: true,
    meta: {
      title: 'DeliverGoods',
      icon: 'peisong',
      type: 9
    },
    children: [
      {
        path: 'AddDeliverGoods',
        component: () => import('@/views/DeliverGoods/AddDeliverGoods'),
        name: 'AddDeliverGoods',
        meta: { title: 'AddDeliverGoods', noCache: false }
      },
      {
        path: 'DeliverGoodsList',
        component: () => import('@/views/DeliverGoods/DeliverGoodsList'),
        name: 'DeliverGoodsList',
        meta: { title: 'DeliverGoodsList', noCache: true }
      }
    ]
  },
  {
    path: '/CarStatList',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'shiyongqingkuan',
      type: 9
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/CarStatList/index'),
        name: 'CarStatList',
        meta: { title: 'CarStatList', noCache: true }
      }
    ]
  },
  {
    path: '/InstallmentApply',
    component: Layout,
    redirect: 'noredirect',
    name: 'InstallmentApply',
    alwaysShow: true,
    meta: {
      title: 'InstallmentApply',
      icon: 'fenqi',
      type: 6,
      roles: ['200-201-4', '200-202-1']
    },
    children: [
      {
        path: 'AddInstallmentApply',
        component: () => import('@/views/InstallmentApply/AddInstallmentApply'),
        name: 'AddInstallmentApply',
        meta: { title: 'AddInstallmentApply', noCache: false, roles: ['200-202-1'] }
      },
      {
        path: 'InstallmentApplyList',
        component: () => import('@/views/InstallmentApply/InstallmentApplyList'),
        name: 'InstallmentApplyList',
        meta: { title: 'InstallmentApplyList', noCache: true, roles: ['200-201-1', '200-201-2', '200-201-3', '200-201-4', '200-201-5', '200-201-6', '200-201-7', '200-201-18', '200-201-58'] }
      }
    ]
  },
  {
    path: '/InstallmentList',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'fenqiliebiao',
      type: 6,
      roles: ['200-203-4', '200-203-2', '200-203-59', '200-203-22', '200-203-7', '200-203-6', '200-203-5']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/InstallmentList/index'),
        name: 'InstallmentList',
        meta: { title: 'InstallmentList', noCache: true }
      }
    ]
  },
  {
    path: '/OverdueList',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'yuqi',
      type: 6,
      roles: ['200-206-4', '200-206-6', '200-206-7', '200-206-74', '200-206-60']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/OverdueList/index'),
        name: 'OverdueList',
        meta: { title: 'OverdueList', noCache: true }
      }
    ]
  },
  {
    path: '/ChangeCount',
    component: Layout,
    redirect: 'noredirect',
    name: 'ChangeCount',
    alwaysShow: true,
    meta: {
      title: 'ChangeCount',
      icon: 'gaiqi',
      type: 6,
      roles: ['200-204-4', '200-205-1']
    },
    children: [
      {
        path: 'AddChangeCount',
        component: () => import('@/views/ChangeCount/AddChangeCount'),
        name: 'AddChangeCount',
        meta: { title: 'AddChangeCount', noCache: false, roles: ['200-205-1'] }
      },
      {
        path: 'ChangeCountList',
        component: () => import('@/views/ChangeCount/ChangeCountList'),
        name: 'ChangeCountList',
        meta: { title: 'ChangeCountList', noCache: true, roles: ['200-204-1', '200-204-2', '200-204-3', '200-204-4', '200-204-5', '200-204-6', '200-204-7', '200-204-18'] }
      }
    ]
  },
  {
    path: '/CollectList',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'yingshoukuan',
      type: 6
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/CollectList/index'),
        name: 'CollectList',
        meta: { title: 'CollectList', noCache: true }
      }
    ]
  },
  {
    path: '/Installmentrate',
    component: Layout,
    redirect: 'noredirect',
    name: 'Installmentrate',
    alwaysShow: true,
    meta: {
      title: 'Installmentrate',
      icon: 'jibenshezhi',
      type: 6
    },
    children: [
      {
        path: 'InstallmentrateList',
        component: () => import('@/views/Installmentrate/InstallmentrateList'),
        name: 'InstallmentrateList',
        meta: { title: 'InstallmentrateList', noCache: true }
      },
      {
        path: 'overdueFineRules',
        component: () => import('@/views/Installmentrate/overdueFineRules'),
        name: 'overdueFineRules',
        meta: { title: 'overdueFineRules', noCache: true }
      },
      {
        path: 'rewardRules',
        component: () => import('@/views/Installmentrate/rewardRules'),
        name: 'rewardRules',
        meta: { title: 'rewardRules', noCache: true }
      }
    ]
  },
  {
    path: '/Collection',
    component: Layout,
    redirect: 'noredirect',
    name: 'Collection',
    alwaysShow: true,
    meta: {
      title: 'Collection',
      icon: 'cuishou',
      type: 6,
      roles: ['200-208-4', '200-209-4', '200-210-1']
    },
    children: [
      {
        path: 'CollectionList',
        component: () => import('@/views/Collection/CollectionList'),
        name: 'CollectionList',
        meta: { title: 'CollectionList', noCache: true, roles: ['200-208-6', '200-208-7', '200-208-29', '200-208-75', '200-208-4'] }
      },
      {
        path: 'AddRecoverVehicle',
        component: () => import('@/views/Collection/AddRecoverVehicle'),
        name: 'AddRecoverVehicle',
        meta: { title: 'AddRecoverVehicle', noCache: false, roles: ['200-210-1'] }
      },
      {
        path: 'RecoverVehicleList',
        component: () => import('@/views/Collection/RecoverVehicleList'),
        name: 'RecoverVehicleList',
        meta: { title: 'RecoverVehicleList', noCache: true, roles: ['200-209-1', '200-209-2', '200-209-3', '200-209-4', '200-209-5', '200-209-6', '200-209-7'] }
      }
    ]
  },
  {
    path: '/Receipt',
    component: Layout,
    redirect: 'noredirect',
    name: 'Receipt',
    alwaysShow: true,
    meta: {
      title: 'Receipt',
      icon: 'shoukuan',
      type: 6,
      roles: ['200-213-4', '200-214-1']
    },
    children: [
      {
        path: 'AddReceipt',
        component: () => import('@/views/Receipt/AddReceipt'),
        name: 'AddReceipt',
        meta: { title: 'AddReceipt', noCache: false, roles: ['200-214-1'] }
      },
      {
        path: 'ReceiptList',
        component: () => import('@/views/Receipt/ReceiptList'),
        name: 'ReceiptList',
        meta: { title: 'ReceiptList', noCache: true, roles: ['200-213-1', '200-213-2', '200-213-3', '200-213-4', '200-213-5', '200-213-6', '200-213-7', '200-213-16'] }
      }
    ]
  },
  {
    path: '/CustomerMarketing',
    component: Layout,
    redirect: 'noredirect',
    name: 'CustomerMarketing',
    alwaysShow: true,
    meta: {
      title: 'CustomerMarketing',
      icon: 'kehuyingxiao',
      type: 5
    },
    children: [
      {
        path: 'AddCustomerChat',
        component: () => import('@/views/CustomerMarketing/AddCustomerChat'),
        name: 'AddCustomerChat',
        meta: { title: 'AddCustomerChat', noCache: false }
      },
      {
        path: 'CustomerChatList',
        component: () => import('@/views/CustomerMarketing/CustomerChatList'),
        name: 'CustomerChatList',
        meta: { title: 'CustomerChatList', noCache: true }
      },
      {
        path: 'AddCustomerVisit',
        component: () => import('@/views/CustomerMarketing/AddCustomerVisit'),
        name: 'AddCustomerVisit',
        meta: { title: 'AddCustomerVisit', noCache: false }
      },
      {
        path: 'CustomerVisitList',
        component: () => import('@/views/CustomerMarketing/CustomerVisitList'),
        name: 'CustomerVisitList',
        meta: { title: 'CustomerVisitList', noCache: true }
      }
    ]
  },
  {
    path: '/Package',
    component: Layout,
    redirect: 'noredirect',
    name: 'Package',
    alwaysShow: true,
    meta: {
      title: 'Package',
      icon: 'zuhetaocan',
      type: 5
    },
    children: [
      {
        path: 'AddPackage',
        component: () => import('@/views/Package/AddPackage'),
        name: 'AddPackage',
        meta: { title: 'AddPackage', noCache: false }
      },
      {
        path: 'PackageList',
        component: () => import('@/views/Package/PackageList'),
        name: 'PackageList',
        meta: { title: 'PackageList', noCache: true }
      }
    ]
  },
  // {
  //   path: '/GroupBuyRules',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'GroupBuyRules',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'GroupBuyRules',
  //     icon: 'tuangou',
  //     type: 5
  //   },
  //   children: [
  //     {
  //       path: 'AddGroupBuyRules',
  //       component: () => import('@/views/GroupBuyRules/AddGroupBuyRules'),
  //       name: 'AddGroupBuyRules',
  //       meta: { title: 'AddGroupBuyRules', noCache: false }
  //     },
  //     {
  //       path: 'GroupBuyRulesList',
  //       component: () => import('@/views/GroupBuyRules/GroupBuyRulesList'),
  //       name: 'GroupBuyRulesList',
  //       meta: { title: 'GroupBuyRulesList', noCache: true }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
