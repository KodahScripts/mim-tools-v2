<template>
    <div class="card flex justify-center">
        <FileUpload mode="basic" name="utaReportData" accept=".xlsx, .xls" @select="onSelect($event)" chooseLabel="Browse" />
    </div>
</template>

<script setup lang="ts">
import type { FileUploadSelectEvent } from 'primevue'
import { ref, type Ref } from 'vue'
import { read, utils } from 'xlsx'

const file: Ref<File | null> = ref(null)
const emit = defineEmits(['fileData'])

function onSelect(event: FileUploadSelectEvent) {
    const target = event
    if(target.files && target.files.length > 0 && target.files[0] != undefined) {
    file.value = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const workbook = read(e.target?.result)
      const sheetName = workbook.SheetNames[0]
      if(sheetName != undefined) {
          const worksheet = workbook.Sheets[sheetName]
          if(worksheet != undefined) {
              const jsonData = utils.sheet_to_json(worksheet, { header: 1 })
              emit('fileData', jsonData)
          }
      }
    }
    if(file.value != null) reader.readAsArrayBuffer(file.value)
  } else {
    file.value = null
  }
}
</script>