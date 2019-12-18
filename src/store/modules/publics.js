const publics = {
  state: {
    empcontract: '',
    empcontract2: '',
    empcontract3: '',
    empcontract4: '',
    voucherdata: '',
    newsaleoutdata: '',
    newreceiptdata: '',
    newinstallpaydata: ''
  },
  mutations: {
    set_newinstallpaydata: (state, newinstallpaydata) => {
      state.newinstallpaydata = newinstallpaydata
    },
    set_newreceiptdata: (state, newreceiptdata) => {
      state.newreceiptdata = newreceiptdata
    },
    set_newsaleoutdata: (state, newsaleoutdata) => {
      state.newsaleoutdata = newsaleoutdata
    },
    set_voucherdata: (state, voucherdata) => {
      state.voucherdata = voucherdata
    },
    set_empcontract: (state, empcontract) => {
      state.empcontract = empcontract
    },
    set_empcontract2: (state, empcontract) => {
      state.empcontract2 = empcontract
    },
    set_empcontract3: (state, empcontract) => {
      state.empcontract3 = empcontract
    },
    set_empcontract4: (state, empcontract) => {
      state.empcontract4 = empcontract
    }
  },
  actions: {
    getnewinstallpaydata({ commit }, newinstallpaydata) {
      commit('set_newinstallpaydata', newinstallpaydata)
    },
    getnewreceiptdata({ commit }, newreceiptdata) {
      commit('set_newreceiptdata', newreceiptdata)
    },
    getnewsaleoutdata({ commit }, newsaleoutdata) {
      commit('set_newsaleoutdata', newsaleoutdata)
    },
    getvoucherdata({ commit }, voucherdata) {
      commit('set_voucherdata', voucherdata)
    },
    getempcontract({ commit }, empcontract) {
      commit('set_empcontract', empcontract)
    },
    getempcontract2({ commit }, empcontract) {
      commit('set_empcontract2', empcontract)
    },
    getempcontract3({ commit }, empcontract) {
      commit('set_empcontract3', empcontract)
    },
    getempcontract4({ commit }, empcontract) {
      commit('set_empcontract4', empcontract)
    }
  }
}

export default publics
