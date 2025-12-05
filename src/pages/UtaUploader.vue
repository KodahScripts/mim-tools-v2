<template>
  <div class="m-5">
    <div class="flex justify-between">
      <SelectButton
        v-model="selectedStore"
        :options="storeOptions"
        optionLabel="name"
        optionValue="value"
      />
      <Button
        severity="danger"
        variant="outlined"
        v-if="UtaRawData"
        @click="clearData"
        label="CLEAR"
      />
      <UploadXlButton v-else label="UTA Upload" @fileData="handleUpload" />
    </div>

    <Accordion value="0" class="m-5">
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
          <div class="flex justify-around text-center">
            <div>FOUND</div>
            <div>CHECK</div>
            <div>AMOUNT</div>
            <div>ACCOUNT</div>
            <div>CONTROL</div>
          </div>
          <div class="mt-1" v-for="row in getSheet(sheetName)" :key="row.uid">
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
import { convertDate, UTA_COLUMN, type UTADepositRow } from '@/utils/index'

const utaStore = useUtaStore()
const { UtaRawData, AllSheets } = storeToRefs(utaStore)
const { clearData, deleteSheet } = utaStore

const globalStore = useGlobalStore()
const { selectedStore, storeOptions } = storeToRefs(globalStore)
const { getMerchantType } = globalStore

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data.slice(1).map((row, index) => {
    const date = String(convertDate(Number(row[UTA_COLUMN.DATE])))
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

const sheetNames = computed(() => {
  return Object.keys(AllSheets.value)
})

function getSheet(sheetName: string): UTADepositRow[] | null {
  if (AllSheets.value[sheetName]) return AllSheets.value[sheetName]
  return null
}
</script>
