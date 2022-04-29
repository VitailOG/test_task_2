<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input v-model="store.form.name" label="name" />
        <q-input v-model="store.form.schema" label="schema" />
        <q-input type="textarea" v-model="store.form.name_aliases" label="alias" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" label="OK" @click="onOKClick(store.form)" :disable="disableButton" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import {useCounterStore} from 'stores/TestStore'
import {computed} from 'vue'
export default {
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const store = useCounterStore()

    const disableButton = computed(() => {
      return store.form.name && store.form.schema && store.form.name_aliases
    })


    return {
      disableButton,
      store,
      dialogRef,
      onDialogHide,
      onOKClick (data) {
        onDialogOK(data)
      },
      onCancelClick: onDialogCancel
    }
  }
}
</script>
