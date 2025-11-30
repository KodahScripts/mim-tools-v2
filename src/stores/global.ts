import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { ACCOUNT, MERCHANT_ID, MERCHANT_CODE } from '@/utils'

export const useGlobalStore = defineStore('global', () => {
  const selectedStore = ref('BMWT')

  const accounts = computed(() => {
    return ACCOUNT[selectedStore.value]
  })

  function changeStore(storeAbbr: string) {
    selectedStore.value = storeAbbr
  }

  function getMerchantType(merchantCode: string) {
    const id = String(merchantCode.slice(-2))
    switch (id) {
      case MERCHANT_ID.VARIABLE:
        return { code: MERCHANT_CODE.VARIABLE, account: accounts.value.variable }
        break
      case MERCHANT_ID.FIXED:
        return { code: MERCHANT_CODE.FIXED, account: accounts.value.fixed }
        break
      default:
        return { code: MERCHANT_CODE.HOLD, account: accounts.value.variable }
        break
    }
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
