import Vue from 'vue'
import Vuex from 'vuex'
// import JSON from '../store.data.json'

import dataJson from './data.json'
import categoriesJson from './categories.json'

Vue.use(Vuex)

export default new Vuex.Store({
  data () {
    return {
    }
  },
  state: {
    paymentsList: [],
    fullPaymentsList: [],
    paginatedPaymentsList: [],
    categoryList: [],
    currentRecord: [],
    myDataJson: dataJson,
    myCategoriesJson: categoriesJson
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsList = payload
    },
    setFullPaymentsListData (state, payload) {
      state.fullPaymentsList = payload
      window.localStorage.setItem(this.myDataJson, this.getFullPaymentsList)
    },
    setCategoryListData (state, payload) {
      state.categoryList = payload
    },
    setCurrentRecord (state, payload) {
      state.currentRecord = payload
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFullPaymentsList: state => state.fullPaymentsList,
    getCategoryList: state => state.categoryList,
    getCurrentRecord: state => state.currentRecord
  },
  actions: {
    addFullData ({ commit }, rec) {
      let haveData = false
      this.state.fullPaymentsList.forEach((item) => {
        if (item.date === rec[0].date &&
        item.category === rec[0].category &&
        item.description === rec[0].description &&
        item.price === rec[0].price) {
          haveData = true
        }
      })
      if (!haveData) {
        return commit('setFullPaymentsListData', this.state.fullPaymentsList.concat(rec))
      }
    },
    changeRecord ({ commit }, rec) {
      this.state.fullPaymentsList[this.state.currentRecord.index - 1].date = rec[0].date
      this.state.fullPaymentsList[this.state.currentRecord.index - 1].category = rec[0].category
      this.state.fullPaymentsList[this.state.currentRecord.index - 1].description = rec[0].description
      this.state.fullPaymentsList[this.state.currentRecord.index - 1].price = rec[0].price
      return commit('setFullPaymentsListData', this.state.fullPaymentsList)
    },
    addCategoryData ({ commit }, rec) {
      let havecategory = false
      this.state.categoryList.forEach((item) => {
        if (item === rec) { havecategory = true }
      })
      if (!havecategory) {
        return commit('setCategoryListData', this.state.categoryList.concat(rec))
      }
    },
    deleteRecord ({ commit }, rec) {
      const arr1 = this.state.fullPaymentsList.slice(0, rec.index - 1)
      const arr2 = this.state.fullPaymentsList.slice(rec.index)
      return commit('setFullPaymentsListData', arr1.concat(arr2))
    },
    fetchFullData ({ commit }) {
      // this.myJson = Json.parse()
      return commit('setFullPaymentsListData', this.state.myDataJson)
    },
    fetchCurrentRecord ({ commit }, arr) {
      // const arr = this.state.fullPaymentsList[index]
      // arr.idx = arr.index
      return commit('setCurrentRecord', arr)
    },
    clearCurrentRecord ({ commit }) {
      const arr = []
      return commit('setCurrentRecord', arr)
    },
    fetchCategoryData ({ commit }) {
      return commit('setCategoryListData', this.state.myCategoriesJson)
    }
  },
  methods: {

  }
})
