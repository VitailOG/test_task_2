<template>
  <div>
    <q-btn @click="filterModalOpen">Фільтри</q-btn>
    <br>
    <br>
    <q-table
      :columns="columns"
      :rows="data"
      :sort-method="customSort"
    >
      <template v-slot:body="item">
        <q-tr @dblclick="edit(item.row)">
          <CustomRow :data="item.row"/>
          <q-td>
              <q-btn @click="deleteInfo(item.row.id)">Видалити</q-btn>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom>
        <CustomFooter :sortData="sortData"/>
      </template>
      <template v-slot:no-data>
        Дані відсутні
      </template>
    </q-table>
    <br>
    <q-btn @click="openModal">Додати</q-btn>
  </div>
</template>

<script>
import DialogForm from "components/DialogForm";
import DialogFilter from "components/DialogFilter";
import CustomRow from "components/TableComponent/CustomRow";
import CustomFooter from "components/TableComponent/CustomFooter";
import {useCounterStore} from 'stores/TestStore'

import { useQuasar } from 'quasar'
import {ref, computed, onMounted, watch} from "vue";

export default {
  name: "MainTable",
  components: {CustomRow, CustomFooter},

  async setup(){
    const $q = useQuasar()


    const store = useCounterStore()

    const sortData = ref([])

    const columns = [
      {name:'id', label:'id', align:'left', sortable: true},
      {name:'name', label:'name', align:'left', sortable: true},
      {name:'schema', label:'schema', align:'left', sortable: true},
      {name:'name_aliases', label:'name_aliases', align:'left', sortable: true},
      {name:'remove', label:'remove', align:'left'},
    ]

    const data = computed(() => {
      return store.data
    })

    const customSort =  (rows, sortBy, descending) => {

      const dictSort = {
        field: sortBy,
      }

      dictSort['order'] = descending ? 'desc' : 'asc'

      const isExistElementInArray = sortData.value.some(element => element['field'] === sortBy ? true : false)

      if (isExistElementInArray) {
        sortData.value = sortData.value.filter(e => e['field'] !== dictSort['field'])
      }

      sortData.value.unshift(dictSort)

      return rows
    }

    watch(sortData.value,(newValue) => {
      store.getData(0, store.pagination.rowsPerPage, store.filterData, newValue)
    }, {deep: true})

    const openModal = () => {
      store.form.name = store.form.schema = store.form.name_aliases = ''
      $q.dialog({
        component:DialogForm,
      })
      .onOk((data) => {
        const info = {
          schema: data.schema,
          name: data.name,
          name_aliases: data.name_aliases.split(',')
        }
        console.log(info)
        store.createData(info)
        $q.notify({
          type:'positive',
          message:'Дані створено'
        })
      })
      .onCancel(() => {
        console.log('cancel')
        store.form.name = store.form.schema = store.form.name_aliases = ''
      })
    }

    const edit = (data) => {
      store.form.id = data.id
      store.form.schema = data.schema
      store.form.name = data.name
      store.form.name_aliases = data.name_aliases.join(',')

      $q.dialog({
        component:DialogForm,
      })
        .onOk((data) => {
          const infoEdit = {
            id: data.id,
            schema: data.schema,
            name: data.name,
            name_aliases: data.name_aliases.split(',')
          }
          store.updateData(infoEdit)
          $q.notify({
            type:'positive',
            message:'Дані відредаговані'
          })
        })
        .onCancel(() => {
          console.log('cancel')
        })
    }

    const filterModalOpen = () => {
      $q.dialog({
        component:DialogFilter
      })
      .onOk((data) => {
        store.filterData = []
        data.map(i => {
          if ([i.field, i.operator, i.value].includes('')){
            store.filterData = []
          } else {
            store.filterData.push(i)
          }
        })
        store.getData(0, store.pagination.rowsPerPage, store.filterData)
      })
    }

    const deleteInfo = (id) => {
      const data = {
        region_id: id
      }
      store.deleteData(data)
      $q.notify({
        type:'negative',
        message:'Дані видалено'
      })
    }

    onMounted(() => {
      store.getData()
    })

    return{
      sortData,
      customSort,
      edit,
      openModal,
      columns,
      data,
      deleteInfo,
      filterModalOpen
    }
  }
}
</script>

<style scoped>

</style>
