<template>
  <div class="flex justify-between p-10">
    <ToggleButton v-model="modelChoice" class="w-48" onLabel="ID.4 / BUZZ" offLabel="General" />
    <Button severity="danger" v-if="hasAnyData" @click="clear"><i class="pi pi-trash"></i></Button>
  </div>
  <div class="w-2/3 mx-auto">
    <VwCalcGeneralForm v-if="!modelChoice" />
    <VwCalcOtherForm v-else />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '@/stores/vw-calculator.ts'
import VwCalcGeneralForm from '@/forms/VwCalcGeneralForm.vue'
import VwCalcOtherForm from '@/forms/VwCalcOtherForm.vue'

const store = useVwCalcStore()
const { modelChoice, hasAnyData } = storeToRefs(store)
const { clear } = store
</script>
