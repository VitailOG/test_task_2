<template>
  <q-btn @click="previewPage" style="margin-left: 15px" :disable="disablePreviewButton">Попередня</q-btn>
  <q-btn @click="nextPage" style="margin-left: 15px">Наступна</q-btn>
  <q-select
    v-model="store.pagination.rowsPerPage"
    :options="[1, 2, 5]"
    style="margin-left: 15px"
    @update:model-value="changePerPage"
  />
</template>

<script>
import {useCounterStore} from 'stores/TestStore'
import {ref} from "vue";

export default {
  name: "CustomFooter",
  props:{
    sortData:{
      required:true
    }
  },
  setup(props){
    const store = useCounterStore()

    const disablePreviewButton = ref(true)

    const nextPage = () => {
      store.pagination.page += store.pagination.rowsPerPage
      store.getData(store.pagination.page, store.pagination.rowsPerPage, store.filterData, props.sortData)
      disablePreviewButton.value = false
    }

    const previewPage = () => {
      store.pagination.page -= store.pagination.rowsPerPage
      store.getData(store.pagination.page, store.pagination.rowsPerPage, store.filterData, props.sortData)
    }

    const changePerPage = (val) => {
      store.pagination.rowsPerPage = val
      store.pagination.page = 0
      store.getData(store.pagination.page, store.pagination.rowsPerPage, store.filterData, props.sortData)
    }


    return {
      disablePreviewButton,
      store,
      nextPage,
      previewPage,
      changePerPage
    }
  }
}
</script>

<style scoped>

</style>
