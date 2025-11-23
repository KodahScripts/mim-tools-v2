<template>
  <Button asChild v-slot="slotProps" variant="outlined">
    <RouterLink to="/" :class="slotProps.class">
      <div v-if="useLabel" class="flex justify-evenly items-center">
        <i class="pi pi-home" style="font-size: 1.5rem"></i>
        <div class="m-2">Home</div>
      </div>
      <div v-else class="text-center items-center">
        <i class="pi pi-home" style="font-size: 1.5rem"></i>
      </div>
    </RouterLink>
  </Button>
</template>
<script setup lang="ts">
defineProps({
  useLabel: {
    type: Boolean,
    default: false,
  },
})
</script>
