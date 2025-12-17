import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { ACCOUNT } from '@/utils/constants'
import { MERCHANT_CODE, MERCHANT_ID } from '@/utils/enums'

export const useGlobalStore = defineStore('global', () => {
  const selectedStore = ref('BMWT')
  const storeOptions = ref([
    { name: 'BMWT', value: 'BMWT' },
    { name: 'WCN', value: 'WCN' },
  ])
  const accounts = computed(() => {
    return ACCOUNT[selectedStore.value]
  })

  function changeStore(storeAbbr: string) {
    selectedStore.value = storeAbbr
  }

  function getMerchantType(merchantCode: string) {
    const id = String(merchantCode.slice(-2))
    let merchant = { code: MERCHANT_CODE.HOLD, account: accounts.value?.variable }
    switch (id) {
      case MERCHANT_ID.VARIABLE:
        merchant = { code: MERCHANT_CODE.VARIABLE, account: accounts.value?.variable }
        break
      case MERCHANT_ID.FIXED:
        merchant = { code: MERCHANT_CODE.FIXED, account: accounts.value?.fixed }
        break
    }
    return merchant
  }

  function createReceiptNumber(numberOfDigits: number) {
    const numberArr: Number[] = []
    while (numberArr.length < numberOfDigits) {
      numberArr.push(Math.floor(Math.random() * 10))
    }
    return Number(numberArr.join(''))
  }

  return {
    selectedStore,
    storeOptions,
    accounts,
    changeStore,
    getMerchantType,
    createReceiptNumber,
  }
})
