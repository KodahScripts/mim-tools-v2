<template>
  <div class="m-5">
    <div>
      <Button
        severity="danger"
        variant="outlined"
        v-if="CcRawData"
        @click="clearData"
        label="CLEAR"
      />
      <UploadXlButton v-else label="CC Upload" @fileData="handleUpload" />
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
            <div>BRAND</div>
            <div>ACCOUNT</div>
            <div>AMOUNT</div>
            <div>FEE</div>
            <div>CONTROL</div>
          </div>
          <div class="mt-1" v-for="row in getSheet(sheetName)" :key="row.uid">
            <CcDisplayRow :rowData="row" />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCcStore } from '@/stores/credit-card'
import { useGlobalStore } from '@/stores/global'
import UploadXlButton from '@/components/UploadXlButton.vue'
import CcDisplayRow from '@/components/CcDisplayRow.vue'
import { convertExcelDateNumber, cleanAmount } from '@/utils/functions'
import { CCOL, BRAND } from '@/utils/enums'
import type { CCDepositRow, RawExcelData } from '@/utils/types'

const ccStore = useCcStore()
const { CcRawData, AllSheets } = storeToRefs(ccStore)
const { clearData, deleteSheet } = ccStore

const globalStore = useGlobalStore()
const { getMerchantType } = globalStore

function handleUpload(data: RawExcelData) {
  CcRawData.value = data.slice(1).map((row, index) => {
    const date = String(row[CCOL.DATE])
    const brand = String(row[CCOL.BRAND]) != BRAND.AMEX ? BRAND.VISA : BRAND.AMEX
    const amount =
      cleanAmount(String(row[CCOL.SETT_AMOUNT])) > 0
        ? cleanAmount(String(row[CCOL.SETT_AMOUNT]))
        : cleanAmount(String(row[CCOL.AUTH_AMOUNT]))
    const surcharge = cleanAmount(String(row[CCOL.SURCHARGE]))
    const total = amount - surcharge
    const flag = { delete: false, found: false }
    return {
      uid: `CC-${index}`,
      date,
      brand,
      amount,
      surcharge,
      total,
      control: String(row[CCOL.CONTROL]),
      merchant: getMerchantType(String(row[CCOL.DEPARTMENT]).charAt(0)),
      response: String(row[CCOL.STATUS]),
      flag,
    }
  })
}

const sheetNames = computed(() => {
  if (AllSheets.value) return Object.keys(AllSheets.value)
})

function getSheet(sheetName: string): CCDepositRow[] | null {
  if (AllSheets.value) {
    if (AllSheets.value[sheetName]) return AllSheets.value[sheetName]
  }
  return null
}
</script>
