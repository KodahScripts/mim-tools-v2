import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVwCalcStore = defineStore('vw-calc', () => {
  const modelChoice = ref('gen')
  const invoiceAmt = ref(0)
  const msrpAmt = ref(0)
  const baseMsrpAmt = ref(0)
  const destinationAmt = ref(0)
  const optionsAmt = ref(0)
  const paintAmt = ref(0)

  const canCalculate = computed((): boolean => {
    if (modelChoice.value === 'gen') {
      if (
        invoiceAmt.value != 0 &&
        msrpAmt.value != 0 &&
        baseMsrpAmt.value != 0 &&
        destinationAmt.value != 0
      )
        return true
    } else {
      if (baseMsrpAmt.value != 0 && optionsAmt.value != 0) return true
    }
    return false
  })

  const getTotal = computed(() => {
    // MSRP - Destination
    if (canCalculate) {
      if (msrpAmt.value != 0 && destinationAmt.value != 0) {
        return Number(Math.round(Number(msrpAmt.value) - Number(destinationAmt.value)).toFixed(2))
      }
    }
    return Number(0.0)
  })

  const getHoldback = computed(() => {
    // Base MSRP * 4.8% || Base MSRP * 2%
    if (canCalculate) {
      if (modelChoice.value === 'other') {
        if (baseMsrpAmt.value != 0) {
          return Number((baseMsrpAmt.value * 0.048).toFixed(2))
        }
      } else {
        return Math.round(Number(getTotal.value) * 0.02).toFixed(2)
      }
    }
    return Number(0.0)
  })

  const getOptionsHB = computed(() => {
    // Options Amount * 2%
    if (optionsAmt.value != 0) {
      if (modelChoice.value === 'other') {
        if (optionsAmt.value > 0) {
          return Math.round(optionsAmt.value * 0.02).toFixed(2)
        }
      }
    }
    return 0.0
  })

  const getPaintHB = computed(() => {
    // Paint Amount * 7.8%
    if (paintAmt.value != 0) {
      if (modelChoice.value === 'other') {
        if (paintAmt.value > 0) {
          return Math.round(paintAmt.value * 0.078).toFixed(2)
        }
      }
    }
    return 0.0
  })

  const getTotalHB = computed(() => {
    if (modelChoice.value === 'other') {
      const hb = Number(getHoldback.value)
      const opt = Number(getOptionsHB.value)
      const pnt = Number(getPaintHB.value)
      const ttl = hb + opt + pnt

      if (hb === 0 || opt === 0) return 0.0
      return Math.floor(ttl + 1).toFixed(2)
    }
    return 0.0
  })

  const getFPA = computed(() => {
    // Base MSRP * 1.5%
    if (baseMsrpAmt.value != 0) {
      return Math.round(baseMsrpAmt.value * 0.015).toFixed(2)
    }
    return 0.0
  })

  const getIDM = computed(() => {
    // Base MSRP * 2% || Base MSRP * 0.8%
    if (baseMsrpAmt.value != 0) {
      if (modelChoice.value === 'other') {
        return Math.round(baseMsrpAmt.value * 0.02).toFixed(2)
      } else {
        return Math.round(baseMsrpAmt.value * 0.008).toFixed(2)
      }
    }
    return 0.0
  })

  const getTrans = computed(() => {
    // Base MSRP * 1.35%
    // if value is under 50 (any hundred amount) round down, else round up next dollar amount
    if (baseMsrpAmt.value != 0) {
      const value = (baseMsrpAmt.value * 0.0135).toFixed(2)
      let val = Math.floor(Math.round(Number(value)))
      const dollarVal = val % 100
      if (dollarVal > 50) return (val + 1).toFixed(2)
      return val.toFixed(2)
    }
    return 0.0
  })

  const getVPB = computed(() => {
    // Base MSRP * 1.9%
    if (baseMsrpAmt.value != 0) {
      return Math.round(baseMsrpAmt.value * 0.019).toFixed(2)
    }
    return 0.0
  })

  function clear() {
    modelChoice.value = 'gen'
    invoiceAmt.value = 0
    msrpAmt.value = 0
    baseMsrpAmt.value = 0
    destinationAmt.value = 0
    optionsAmt.value = 0
    paintAmt.value = 0
  }

  return {
    modelChoice,
    invoiceAmt,
    msrpAmt,
    baseMsrpAmt,
    destinationAmt,
    optionsAmt,
    paintAmt,
    getTotal,
    getHoldback,
    getOptionsHB,
    getPaintHB,
    getTotalHB,
    getFPA,
    getIDM,
    getTrans,
    getVPB,
    canCalculate,
    clear,
  }
})
