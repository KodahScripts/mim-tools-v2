<template>
  <div class="m-10">
    <UploadXlButton label="Upload UTA" @fileData="handleUpload" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'
import { useGlobalStore } from '@/stores/global'
import UploadXlButton from '@/components/UploadXlButton.vue'
import { convertDate } from '@/utils/xlFunctions'
import { COLUMN } from '@/utils/definitions'

const utaStore = useUtaStore()
const { UtaRawData, AllSheets } = storeToRefs(utaStore)
const { buildSheet } = utaStore

const globalStore = useGlobalStore()
const { selectedStore } = storeToRefs(globalStore)
const { getMerchantType } = globalStore

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data.slice(1).map((row, index) => {
    const date = convertDate(Number(row[COLUMN.UTA.DATE]))
    const merch = getMerchantType(String(row[COLUMN.UTA.MERCHANT]))
    const flag = { delete: false, found: false }
    return {
      uid: `UTA-${index}`,
      date,
      chk: String(row[COLUMN.UTA.CHECK_NUMBER]),
      total: Number(row[COLUMN.UTA.TOTAL_AMOUNT]).toFixed(2),
      merch,
      resp: String(row[COLUMN.UTA.RESPONSE]),
      ctrl:
        String(row[COLUMN.UTA.CONTROL]).length > 6 && !String(row[COLUMN.UTA.CONTROL]).includes('-')
          ? String(row[COLUMN.UTA.CONTROL]).slice(-6)
          : String(row[COLUMN.UTA.CONTROL]),
      flag,
    }
  })
}
</script>
