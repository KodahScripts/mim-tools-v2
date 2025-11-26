<template>
  <div class="flex justify-between m-10">
    <SelectButton v-model="modelChoice" :options="options" optionLabel="name" optionValue="value" />
    <Button severity="danger" v-if="hasAnyData" @click="clear"><i class="pi pi-trash"></i></Button>
  </div>
  <div class="w-2/3 mx-auto">
    <VwCalcGeneralForm v-if="!modelChoice" />
    <VwCalcOtherForm v-else />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '@/stores/vw-calculator.ts'
import VwCalcGeneralForm from '@/forms/VwCalcGeneralForm.vue'
import VwCalcOtherForm from '@/forms/VwCalcOtherForm.vue'

const store = useVwCalcStore()
const { modelChoice, hasAnyData } = storeToRefs(store)
const { clear } = store

const options = ref([
  { name: 'General', value: false },
  { name: 'ID.4 / BUZZ', value: true },
])
</script>
