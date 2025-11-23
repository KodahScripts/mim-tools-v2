<template>
  <div class="flex justify-around">
    <div class="w-84">
      <div class="mb-20">
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
      </div>
      <Message :pt="messageStyles" :severity="canCalculate ? 'success' : 'error'">
        <span>{{ results[0].label }}</span>
        <span>{{ results[0].value }}</span>
      </Message>
    </div>
    <div class="w-84">
      <div class="mb-20">
        <Message
          v-for="(holdback, index) in holdbacks"
          :key="`holdback-${index}`"
          class="mb-4"
          :pt="messageStyles"
        >
          <span>{{ holdback.label }}</span>
          <span>{{ holdback.value }}</span>
        </Message>
      </div>
      <Message :pt="messageStyles" :severity="canCalculate ? 'success' : 'error'">
        <span>{{ results[1].label }}</span>
        <span>{{ results[1].value }}</span>
      </Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '../stores/vw-calculator'

const store = useVwCalcStore()
const {
  baseMsrpAmt,
  optionsAmt,
  paintAmt,
  getHoldback,
  getOptionsHB,
  getPaintHB,
  getTotalHB,
  getIDM,
  canCalculate,
} = storeToRefs(store)

const inputs = [
  {
    id: 'base-amount',
    label: 'Base MSRP Amount',
    value: baseMsrpAmt,
  },
  {
    id: 'options-amount',
    label: 'Options Total',
    value: optionsAmt,
  },
  {
    id: 'paint-amount',
    label: 'Paint',
    value: paintAmt,
  },
]

const holdbacks = [
  {
    label: 'Holdback',
    value: getHoldback,
  },
  {
    label: 'Options Holdback',
    value: getOptionsHB,
  },
  {
    label: 'Paint Holdback',
    value: getPaintHB,
  },
]

const results = [
  {
    label: 'Total Holdback',
    value: getTotalHB,
  },
  {
    label: 'IDM',
    value: getIDM,
  },
]

const messageStyles = {
  text: 'flex grow justify-between text-slate-400 h-6.5',
}
</script>
