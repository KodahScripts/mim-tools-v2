import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { ACCT } from '../utils/definitions'

export const useGlobalStore = defineStore('global', () => {
  const selectedStore = ref('BMWT')

  const accounts = computed(() => {
    return ACCT[selectedStore.value]
  })

  function changeStore(storeAbbr: string) {
    selectedStore.value = storeAbbr
  }

  function getMerchantType(merchantCode: string) {
    const id = merchantCode.slice(-2)
    if (id === '00') {
      return { code: 'V', acct: accounts.value?.vari }
    }
    if (id === '02') {
      return { code: 'F', acct: accounts.value?.fixed }
    }
    return { code: 'H', acct: accounts.value?.vari }
  }

  function createReceiptNumber(numberOfDigits: number) {
    const numberArr: Number[] = []
    while (numberArr.length < numberOfDigits) {
      numberArr.push(Math.floor(Math.random() * 10))
    }
    return Number(numberArr.join(''))
  }

  return { selectedStore, accounts, changeStore, getMerchantType, createReceiptNumber }
})
