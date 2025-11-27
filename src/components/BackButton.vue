<template>
  <Button asChild v-slot="slotProps" variant="outlined">
    <RouterLink :to="url" :class="slotProps.class">
      <div class="flex text-center items-center">
        <i v-if="!labelOnly" :class="iconClass" style="font-size: 1.5rem"></i>
        <div v-if="labelOnly || useLabel" class="m-2">{{ label }}</div>
      </div>
    </RouterLink>
  </Button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { PrimeIcons } from '@primevue/core/api'

const props = defineProps({
  label: {
    type: String,
    default: 'HOME',
  },
  url: {
    type: String,
    default: '/',
  },
  useLabel: {
    type: Boolean,
    default: false,
  },
  labelOnly: {
    type: Boolean,
    default: false,
  },
  useArrow: {
    type: Boolean,
    default: false,
  },
})

const iconClass = computed(() => {
  return props.useArrow ? PrimeIcons.CHEVRON_LEFT : PrimeIcons.HOME
})
</script>
