<template>
  <div class="flex justify-around">
    <div class="w-84">
      <FloatLabel
        variant="on"
        v-for="(input, index) in inputs"
        :key="`input-${index}`"
        class="mb-4"
      >
        <InputNumber
          v-model="input.value"
          :inputId="input.id"
          mode="currency"
          currency="USD"
          locale="en-US"
          fluid
        />
        <label :for="input.id">{{ input.label }}</label>
      </FloatLabel>
      <Message :pt="messageStyles">
        <span>{{ total.label }}</span>
        <span>{{ total.value }}</span>
      </Message>
    </div>
    <div class="w-84">
      <Message
        v-for="(result, index) in results"
        :key="`result-${index}`"
        :severity="canCalculate ? 'success' : 'error'"
        class="mb-4"
        :pt="messageStyles"
      >
        <span>{{ result.label }}</span>
        <span>{{ result.value }}</span>
      </Message>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '../stores/vw-calculator'

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

const inputs = ref([
  {
    id: 'invoice-amount',
    label: 'Invoice Amount',
    value: invoiceAmt,
  },
  {
    id: 'msrp-amount',
    label: 'MSRP Amount',
    value: msrpAmt,
  },
  {
    id: 'base-amount',
    label: 'Base MSRP Amount',
    value: baseMsrpAmt,
  },
  {
    id: 'destination-amount',
    label: 'Destination Amount',
    value: destinationAmt,
  },
])

const total = ref({
  label: 'Total',
  value: getTotal,
})

const results = ref([
  {
    label: 'Holdback',
    value: getHoldback,
  },
  {
    label: 'FPA',
    value: getFPA,
  },
  {
    label: 'IDM',
    value: getIDM,
  },
  {
    label: 'Trans',
    value: getTrans,
  },
  {
    label: 'VPB',
    value: getVPB,
  },
])

const messageStyles = ref({
  text: 'flex grow justify-between text-slate-400 h-6.5',
})
</script>
