<template>
  <div
    :class="[
      'flex justify-around text-center p-3 rounded-2xl text-black items-center',
      {
        'bg-red-200': rowData.flag.delete,
        'bg-amber-100': !rowData.flag.found,
        'bg-emerald-100': rowData.flag.found,
      },
    ]"
  >
    <Checkbox v-model="rowData.flag.found" binary />
    <div>{{ rowData.check_number }}</div>
    <div>{{ rowData.total }}</div>
    <div>{{ rowData.merchant.account }}</div>
    <div>{{ rowData.control }}</div>
    <Button severity="danger" @click="deleteRow(rowData.uid)">
      <i class="pi pi-trash"></i>
    </Button>
  </div>
</template>
<script setup lang="ts">
import type { UTADepositRow } from '@/utils/types'
import { useUtaStore } from '@/stores/uta'

defineProps<{
  rowData: UTADepositRow
}>()
const store = useUtaStore()
const { deleteRow } = store
</script>
