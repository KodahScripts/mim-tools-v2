<template>
  <div class="m-10">
    <Button severity="danger" v-if="hasData" @click="UtaRawData = null">
      <i class="pi pi-trash"></i>
    </Button>
    <UploadXlButton v-else label="UTA Upload" @fileData="handleUpload" />

    <Accordion value="0" class="m-5">
        <AccordionPanel v-for="(sheetName, index) in sheetNames" :key="sheetName" :value="index">
            <AccordionHeader>{{ sheetName }}</AccordionHeader>
            <AccordionContent>
                <div class="m-0" v-for="row in getSheet(sheetName)" :key="row.uid">
                  {{ row.control }} - {{ row.total }}
                </div>
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'
import { useGlobalStore } from '@/stores/global'
import UploadXlButton from '@/components/UploadXlButton.vue'
import DepositGroup from '@/templates/DepositGroup.vue'
import { convertDate, UTA_COLUMN, type UTADepositRow } from '@/utils'

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

const hasData = computed(() => {
  return AllSheets.value === undefined || Object.keys(AllSheets).length === 0 ? false : true
})

const sheetNames = computed(() => {
  return Object.keys(AllSheets.value)
})

function getSheet(sheetName: string):UTADepositRow[] | null {
  if(AllSheets.value[sheetName]) return AllSheets.value[sheetName]
  return null
}
</script>
