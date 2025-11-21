<template>
  <FloatLabel variant="on">
    <InputNumber
      v-bind="boundValue"
      :inputId="id"
      @change="handleInput"
      mode="currency"
      currency="USD"
      locale="en-US"
    />
    <label :for="id">{{ displayId }}</label>
  </FloatLabel>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:boundValue'])

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  boundValue: {
    type: Number,
    required: true,
  },
})

const displayId = computed(() => {
  const strArr = props.id.split('-')
  return strArr
    .map((word) => {
      const [first, ...rest] = word
      return [first?.toUpperCase(), rest.join('')].join('')
    })
    .join(' ')
})

function handleInput(event: Event) {
  console.log('ok ok ok')
  if (event.target) {
    console.log(event.target)
    const target = event.target as HTMLInputElement
    emit('update:boundValue', target.value)
  }
}
</script>
