<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent >
    <q-card class="q-dialog-plugin" style="max-width: 500px;width:500px">
      <div v-for="(item, index) in arrayInputFilter" :key="index">
        <div class="row" style="margin-top: 15px">
          <q-select v-model="item.field" :options="['id', 'schema', 'name']" label="поле" style="margin-left: 30px" />
          <q-select v-model="item.operator" :options="operators" label="оператор" style="margin-left: 20px" />
          <q-input v-model="item.value" label="дані" style="margin-left: 30px" />
          <q-btn style="margin-left: 10px" @click="addArea">+</q-btn>
          <q-btn style="margin-left: 10px" @click="removeArea(index)" :disable="disableButtonRemoveArea">-</q-btn>
        </div>
      </div>
      <q-card-actions align="right" style="margin-top: 30px">
        <q-btn color="primary" label="Reset" @click="resetData" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="onOKClick(arrayInputFilter)"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { useDialogPluginComponent } from 'quasar'
import {onMounted, reactive, ref} from "vue";

const operators = ['=', '<>', '>', '<']
export default {
  name: "DialogFilter",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const arrayInputFilter = ref([])
    const filterData = reactive({
      field:'',
      operator:'',
      value:''
    })

    const disableButtonRemoveArea = ref(false)

    const addArea = () => {
      arrayInputFilter.value.push({
        field: filterData.field,
        operator: filterData.operator,
        value: filterData.value
      })
      disableButtonRemoveArea.value = false
    }

    const removeArea = (index) => {
      if(arrayInputFilter.value.length > 1){
        arrayInputFilter.value.splice(index, 1)
        localStorage.removeItem('data')
        localStorage.setItem('data', JSON.stringify(arrayInputFilter.value))
      } else {
        disableButtonRemoveArea.value = true
      }
    }

    const resetData = () => {
      arrayInputFilter.value = []
      arrayInputFilter.value.push({
        field: filterData.field,
        operator: filterData.operator,
        value: filterData.value
      })
    }

    onMounted(() => {

      if(localStorage.getItem('data')){
        JSON.parse(localStorage.getItem('data')).map(i => {
          arrayInputFilter.value.push(i)
        })
      } else {
        arrayInputFilter.value.push({
          field: filterData.field,
          operator: filterData.operator,
          value: filterData.value
        })
        // if (arrayInputFilter.value.length > 1){
        //   arrayInputFilter.value.push({
        //     field: filterData.field,
        //     operator: filterData.operator,
        //     value: filterData.value
        //   })
        // } else {
        //   disableButtonRemoveArea.value = true
        // }
      }
    })

    return {
      resetData,
      disableButtonRemoveArea,
      removeArea,
      arrayInputFilter,
      filterData,
      operators,
      addArea,
      dialogRef,
      onDialogHide,
      onOKClick (data) {
        onDialogOK(data)
        localStorage.setItem('data', JSON.stringify(data))
      },
      onCancelClick: onDialogCancel
    }
  }
}
</script>

<style scoped>

</style>
