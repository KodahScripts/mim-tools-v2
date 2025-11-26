import { ref, computed, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { utils, writeFile } from 'xlsx'
import { useGlobalStore } from './global'
import type { UTADepositRow, UploadSheet } from '../utils/definitions'

export const useUtaStore = defineStore('uta', () => {
  const globalStore = useGlobalStore()
  const { selectedStore } = storeToRefs(globalStore)
  const { createReceiptNumber } = globalStore

  const UtaRawData: Ref<UTADepositRow[] | null> = ref(null)

  const AllSheets = computed(() => {
    const sheets: UploadSheet = {}
    const sortedSheets: UploadSheet = {}
    if (UtaRawData.value) {
      UtaRawData.value.forEach((row) => {
        let refStr = `UTA${row.date}${row.merch.code}`
        if (row.resp === 'DENIED') refStr += '-DEN'
        if (row.resp === 'REFERRAL') refStr += '-REF'
        if (row.flag.delete) refStr += '-DEL'
        if (sheets[refStr]) {
          sheets[refStr]?.push(row)
        } else {
          sheets[refStr] = [row]
        }
      })

      const keys = Object.keys(sheets).sort()

      keys.forEach((key) => {
        sortedSheets[key] = sheets[key]
      })
    }
    return sortedSheets
  })

  function getRow(uid: string) {
    return UtaRawData.value?.filter((row) => row.uid === uid)[0]
  }

  function changeCtrl(uid: string, newCtrl: string) {
    const row = getRow(uid)
    if (row) {
      row.ctrl = newCtrl
    }
  }

  function changeAcct(uid: string, newAcct: string) {
    const row = getRow(uid)
    if (row) {
      row.merch.acct = newAcct
    }
  }

  function deleteRow(uid: string) {
    const row = getRow(uid)
    if (row) {
      if (row.flag.delete) {
        removeRow(uid)
      } else {
        row.flag.delete = true
      }
    }
  }

  function undoDeleteRow(uid: string) {
    const row = getRow(uid)
    if (row) {
      row.flag.delete = false
    }
  }

  function deleteSheet(sheetName: string) {
    if (sheetName.endsWith('-DEL')) {
      removeSheet(sheetName)
    } else {
      const sheet = AllSheets.value[sheetName]
      sheet?.forEach((deposit) => {
        const row = getRow(deposit.uid)
        if (row) {
          row.flag.delete = true
        }
      })
    }
  }

  function undoDeleteSheet(sheetName: string) {
    const sheet = AllSheets.value[sheetName]
    sheet?.forEach((deposit) => {
      const row = getRow(deposit.uid)
      if (row) {
        row.flag.delete = false
      }
    })
  }

  function removeRow(uid: string) {
    if (UtaRawData.value) {
      UtaRawData.value = UtaRawData.value.filter((row) => row.uid != uid)
    }
  }

  function removeSheet(sheetName: string) {
    const sheet = AllSheets.value[sheetName]
    sheet?.forEach((row) => {
      if (UtaRawData.value) {
        UtaRawData.value = UtaRawData.value?.filter((data) => data.uid != row.uid)
      }
    })
  }

  function buildSheet() {
    const sheets = AllSheets.value
    const deleteSheets: UTADepositRow[] = []
    const printSheets: UTADepositRow[] = []
    const deleteBook = utils.book_new()

    Object.keys(sheets).forEach((sheetName: string) => {
      if (sheetName.includes('-DEL')) deleteSheets[sheetName] = sheets[sheetName]
      else if (sheetName.includes('-DEN')) deleteSheets[sheetName] = sheets[sheetName]
      else if (sheetName.includes('-REF')) deleteSheets[sheetName] = sheets[sheetName]
      else printSheets[sheetName] = sheets[sheetName]
    })

    Object.keys(printSheets).forEach((sheetName: string) => {
      const book = utils.book_new()
      if (printSheets[sheetName]) {
        const receipt = createReceiptNumber(8)
        const data = printSheets[sheetName].map((row: UTADepositRow) => {
          const ref = sheetName.includes('-') ? sheetName : `${sheetName}-1`
          return {
            reference: ref,
            receipt,
            glAccount: row.merch.acct,
            amount: row.total,
            control: row.ctrl,
            description: '',
          }
        })
        const sheet = utils.json_to_sheet(data)
        utils.book_append_sheet(book, sheet, sheetName)
      }
      writeFile(book, `${selectedStore.value}_${sheetName}.csv`)
    })

    Object.keys(deleteSheets).forEach((sheetName: string) => {
      if (deleteSheets[sheetName]) {
        const receipt = createReceiptNumber(5)
        const data = deleteSheets[sheetName].map((row: UTADepositRow) => {
          const ref = sheetName.includes('-') ? sheetName : `${sheetName}-1`
          return {
            reference: ref,
            receipt,
            glAccount: row.merch.acct,
            amount: row.total,
            control: row.ctrl,
            description: '',
          }
        })
        const sheet = utils.json_to_sheet(data)
        utils.book_append_sheet(deleteBook, sheet, sheetName)
      }
    })
    const today = new Date().toDateString()
    writeFile(deleteBook, `${selectedStore.value}_${today}.xlsx`)
  }

  function clearData() {
    UtaRawData.value = null
  }

  return {
    UtaRawData,
    AllSheets,
    changeCtrl,
    changeAcct,
    getRow,
    deleteSheet,
    undoDeleteSheet,
    deleteRow,
    undoDeleteRow,
    removeRow,
    removeSheet,
    buildSheet,
    clearData,
  }
})
