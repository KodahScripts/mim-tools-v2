import { ref, computed, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { utils, writeFile } from 'xlsx'
import { useGlobalStore } from './global'
import type { CCDepositRow, CCDepositRows } from '@/utils/types'

export const useCcStore = defineStore('credit-card', () => {
  const globalStore = useGlobalStore()
  const { selectedStore } = storeToRefs(globalStore)
  const { createReceiptNumber } = globalStore

  const CcRawData: Ref<CCDepositRow[] | null> = ref(null)

  const AllSheets = computed(() => {
    const sheets: CCDepositRows = {}
    if (CcRawData.value) {
      CcRawData.value.forEach((row) => {
        let refStr = `CC${row.date}${row.merchant.code}`
        if (row.response === 'DENIED') {
          refStr += '-DEN'
          row.flag.delete = true
        }
        if (row.response === 'REFERRAL') {
          refStr += '-REF'
          row.flag.delete = true
        }
        if (row.flag.delete) refStr += '-DEL'
        if (sheets[refStr]) {
          sheets[refStr]?.push(row)
        } else {
          sheets[refStr] = [row]
        }
      })
      return sortSheets(sheets)
    }
  })

  function sortSheets(sheets: CCDepositRows) {
    const sortedSheets: CCDepositRows = {}
    const keys = Object.keys(sheets).sort()

    keys.forEach((key) => {
      if (sheets[key] != undefined) {
        sortedSheets[key] = sheets[key]
      }
    })
    return sortedSheets
  }

  function getRow(uid: string) {
    return CcRawData.value?.filter((row) => row.uid === uid)[0]
  }

  function changeCtrl(uid: string, newCtrl: string) {
    const row = getRow(uid)
    if (row) {
      row.control = newCtrl
    }
  }

  function changeAcct(uid: string, newAcct: string) {
    const row = getRow(uid)
    if (row) {
      row.merchant.account = newAcct
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
      if (AllSheets.value) {
        const sheet = AllSheets.value[sheetName]
        sheet?.forEach((deposit) => {
          const row = getRow(deposit.uid)
          if (row) {
            row.flag.delete = true
          }
        })
      }
    }
  }

  function undoDeleteSheet(sheetName: string) {
    if (AllSheets.value) {
      const sheet = AllSheets.value[sheetName]
      sheet?.forEach((deposit) => {
        const row = getRow(deposit.uid)
        if (row) {
          row.flag.delete = false
        }
      })
    }
  }

  function removeRow(uid: string) {
    if (CcRawData.value) {
      CcRawData.value = CcRawData.value.filter((row) => row.uid != uid)
    }
  }

  function removeSheet(sheetName: string) {
    if (AllSheets.value) {
      const sheet = AllSheets.value[sheetName]
      sheet?.forEach((row) => {
        if (CcRawData.value) {
          CcRawData.value = CcRawData.value?.filter((data) => data.uid != row.uid)
        }
      })
    }
  }

  function foundRow(uid: string) {
    const row = getRow(uid)
    if (row) {
      row.flag.found = true
    }
  }

  function loseRow(uid: string) {
    const row = getRow(uid)
    if (row) {
      row.flag.found = false
    }
  }

  function writeCSV(sheets: CCDepositRows) {
    Object.keys(sheets).forEach((sheetName: string) => {
      const book = utils.book_new()
      if (sheets[sheetName]) {
        const receipt = createReceiptNumber(8)
        const data = sheets[sheetName].map((row: CCDepositRow) => {
          const ref = sheetName.includes('-') ? sheetName : `${sheetName}-1`
          return {
            reference: ref,
            receipt,
            glAccount: row.merchant.account,
            amount: row.amount,
            control: row.control,
            description: '',
          }
        })
        const sheet = utils.json_to_sheet(data)
        utils.book_append_sheet(book, sheet, sheetName)
      }
      writeFile(book, `${selectedStore.value}_${sheetName}.csv`)
    })
  }

  function writeBook(sheets: CCDepositRows) {
    const today = new Date().toDateString()
    const book = utils.book_new()
    Object.keys(sheets).forEach((sheetName: string) => {
      const data = sheets[sheetName] != undefined ? sheets[sheetName] : []
      const sheet = utils.json_to_sheet(data)
      utils.book_append_sheet(book, sheet, sheetName)
    })
    writeFile(book, `${selectedStore.value}_${today}_DELETED.xlsx`)
  }

  function buildSheet() {
    const sheets = AllSheets.value
    const deleteSheets: CCDepositRows = {}
    const printSheets: CCDepositRows = {}

    if (sheets) {
      Object.keys(sheets).forEach((sheetName: string) => {
        const suffix = sheetName.split('-')[1] ? sheetName.split('-')[1] : null
        switch (suffix) {
          case '-DEL':
            deleteSheets[sheetName] = sheets[sheetName] != undefined ? sheets[sheetName] : []
            break
          case '-DEN':
            deleteSheets[sheetName] = sheets[sheetName] != undefined ? sheets[sheetName] : []
            break
          case '-REF':
            deleteSheets[sheetName] = sheets[sheetName] != undefined ? sheets[sheetName] : []
            break
          default:
            printSheets[sheetName] = sheets[sheetName] != undefined ? sheets[sheetName] : []
            break
        }
      })
    }
    writeCSV(printSheets)
    writeBook(deleteSheets)
  }

  function clearData() {
    CcRawData.value = null
  }

  return {
    CcRawData,
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
    foundRow,
    loseRow,
    buildSheet,
    writeCSV,
    clearData,
  }
})
