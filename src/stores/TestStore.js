import { defineStore } from 'pinia';
import axios from 'axios'
import {Loading} from 'quasar'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    data:[],
    filterData:[],
    form: {
      id:null,
      schema: '',
      name: '',
      name_aliases: ''
    },
    pagination:{
      rowsPerPage:5,
      page:0,
      sortBy:'desc',
      descending: false
    }
  }),
  getters:{
    getDataTable(state){
      return state.data
    }
  },
  actions: {
    async getData(offset=0, limit=5, filterData=[], sortData=[]){
      try {
        Loading.show({
          message:'Wait please...'
        })
        const response = await axios.post('http://127.0.0.1:3001/api/v1/region/list',{
          "request": {
            "limit": limit,
            "offset": offset,
            "order_by": sortData,
            "filter_by": filterData
          },
          "uselist": true
        })
        this.data = response.data
        Loading.hide()
      } catch (e) {
        console.log(e)
      }
    },
    async createData(data){
      try {
        const response = await axios.post('http://127.0.0.1:3001/api/v1/region/create', data)
        this.data.unshift(response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async updateData(data){
      try {
        const response = await axios.post('http://127.0.0.1:3001/api/v1/region/update', data)
        let index = this.data.findIndex(obj => obj.id === data.id)
        this.data[index] = response.data
      } catch (e) {
        console.log(e)
      }
    },
    async deleteData(data){
      try {
        console.log(data)
        const response = await axios.post('http://127.0.0.1:3001/api/v1/region/delete', data)
        console.log(response)
        this.data = this.data.filter(i => {
          return i.id !== data.region_id
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
});
