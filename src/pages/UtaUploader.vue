<template>
  <div class="m-5">
    <div>
      <Button
        severity="danger"
        variant="outlined"
        v-if="UtaRawData"
        @click="clearData"
        label="CLEAR"
      />
      <UploadXlButton v-else label="UTA Upload" @fileData="handleUpload" />
    </div>

    <Accordion v-if="AllSheets" value="0" class="m-5">
      <AccordionPanel v-for="(sheetName, index) in sheetNames" :key="sheetName" :value="index">
        <AccordionHeader>
          <div class="flex justify-between w-full">
            <div>{{ sheetName }}</div>
            <div>
              <Button severity="danger" @click="deleteSheet(sheetName)" class="me-5">
                <i class="pi pi-trash text-white"></i>
              </Button>
            </div>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <div class="flex justify-evenly text-center">
            <div>FOUND</div>
            <div>CHECK</div>
            <div>AMOUNT</div>
            <div>ACCOUNT</div>
            <div>CONTROL</div>
            <div></div>
          </div>
          <div class="mt-1" v-for="(row, index) in getSheet(sheetName)" :key="`uta-row-${index}`">
            <UtaDisplayRow :rowData="row" />
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
import UtaDisplayRow from '@/components/UtaDisplayRow.vue'
import { convertExcelDateNumber } from '@/utils/functions'
import type { UTADepositRow } from '@/utils/types'
import { UCOL } from '@/utils/enums'

const utaStore = useUtaStore()
const { UtaRawData, AllSheets } = storeToRefs(utaStore)
const { clearData, deleteSheet } = utaStore

const globalStore = useGlobalStore()
const { getMerchantType } = globalStore

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data.slice(1).map((row, index) => {
    const date = String(convertExcelDateNumber(Number(row[UCOL.DATE])))
    const merchant = getMerchantType(String(row[UCOL.MERCHANT]))
    const flag = { delete: false, found: false }
    return {
      uid: `UTA-${index}`,
      date,
      check_number: String(row[UCOL.CHECK_NUMBER]),
      total: Number(row[UCOL.TOTAL_AMOUNT]),
      merchant,
      response: String(row[UCOL.RESPONSE]),
      control:
        String(row[UCOL.CONTROL]).length > 6 && !String(row[UCOL.CONTROL]).includes('-')
          ? String(row[UCOL.CONTROL]).slice(-6)
          : String(row[UCOL.CONTROL]),
      flag,
    }
  })
}

const sheetNames = computed(() => {
  if (AllSheets.value) {
    return Object.keys(AllSheets.value)
  }
})

function getSheet(sheetName: string): UTADepositRow[] | null {
  if (AllSheets.value) {
    if (AllSheets.value[sheetName]) return AllSheets.value[sheetName]
  }
  return null
}
</script>
