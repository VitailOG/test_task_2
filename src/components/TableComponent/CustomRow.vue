<template>
  <q-td>{{ data.id }}</q-td>
  <q-td>{{ data.name }}</q-td>
  <q-td>{{ data.schema }}</q-td>
  <q-td>
    <span v-for="i in data.name_aliases" :key="i">
      {{ i }}<br>
    </span>
  </q-td>
</template>

<script>
export default {
  name: "CustomRow",
  props:{
    data:{
      required:true
    }
  }
}
</script>

<style scoped>

</style>
