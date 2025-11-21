<template>
  <CurrencyInput id="invoice-amount" :boundValue="invoiceAmt" />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '../stores/vw-calculator'
import CurrencyInput from '../components/CurrencyInput.vue'

const store = useVwCalcStore()
const {
  invoiceAmt,
  msrpAmt,
  baseMsrpAmt,
  destinationAmt,
  getTotal,
  getHoldback,
  getFPA,
  getIDM,
  getTrans,
  getVPB,
  canCalculate,
} = storeToRefs(store)
</script>
