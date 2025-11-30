<template>
  <div class="m-10">
    <UploadXlButton label="UTA Upload" @fileData="handleUpload" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'
import { useGlobalStore } from '@/stores/global'
import UploadXlButton from '@/components/UploadXlButton.vue'
import { convertDate, UTA_COLUMN } from '@/utils'

const utaStore = useUtaStore()
const { UtaRawData, AllSheets } = storeToRefs(utaStore)
const { buildSheet } = utaStore

const globalStore = useGlobalStore()
const { selectedStore } = storeToRefs(globalStore)
const { getMerchantType } = globalStore

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data.slice(1).map((row, index) => {
    const date = convertDate(Number(row[UTA_COLUMN.DATE]))
    const merchant = getMerchantType(String(row[UTA_COLUMN.MERCHANT]))
    const flag = { delete: false, found: false }
    return {
      uid: `UTA-${index}`,
      date,
      check_number: String(row[UTA_COLUMN.CHECK_NUMBER]),
      total: Number(row[UTA_COLUMN.TOTAL_AMOUNT]).toFixed(2),
      merchant,
      response: String(row[UTA_COLUMN.RESPONSE]),
      control:
        String(row[UTA_COLUMN.CONTROL]).length > 6 && !String(row[UTA_COLUMN.CONTROL]).includes('-')
          ? String(row[UTA_COLUMN.CONTROL]).slice(-6)
          : String(row[UTA_COLUMN.CONTROL]),
      flag,
    }
  })
}
</script>
