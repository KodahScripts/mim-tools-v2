<template>
  <FormSection>
    <FormItem id="baseMsrpAmt" v-model="baseMsrpAmt">
      <template #label>Base MSRP</template>
    </FormItem>
    <FormItem id="optionsAmt" v-model="optionsAmt">
      <template #label>Options Total</template>
    </FormItem>
    <FormItem id="paintAmt" v-model="paintAmt">
      <template #label>Paint</template>
    </FormItem>
    <ResultItem>
      <template #label>Holdback</template>
      <template #result>{{ getHoldback }}</template>
    </ResultItem>
    <ResultItem>
      <template #label>Options Holdback</template>
      <template #result>{{ getOptionsHB }}</template>
    </ResultItem>
    <ResultItem>
      <template #label>Paint Holdback</template>
      <template #result>{{ getPaintHB }}</template>
    </ResultItem>
  </FormSection>
  <FormSection v-if="canCalculate">
    <ResultItem isRed>
      <template #label>Total Holdback</template>
      <template #result>{{ getTotalHB }}</template>
    </ResultItem>
    <ResultItem isRed>
      <template #label>IDM</template>
      <template #result>{{ getIDM }}</template>
    </ResultItem>
  </FormSection>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useVwCalcStore } from '../stores/vw-calculator'
import FormSection from '../templates/FormSection.vue'
import ResultItem from '../templates/ResultItem.vue'
import FormItem from '../components/VwCalcFormItem.vue'

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
</script>
