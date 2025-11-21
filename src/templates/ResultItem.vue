<template>
  <div class="flex justify-between" :class="{ 'text-red-500 font-bold': isRed }">
    <label>
      <slot name="label"></slot>
    </label>
    <label>
      <slot name="result"></slot>
    </label>
  </div>
</template>
<script setup lang="ts">
defineProps({
  isRed: {
    type: Boolean,
    default: false,
  },
})
</script>
