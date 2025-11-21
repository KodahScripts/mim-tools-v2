<template>
  <Button asChild v-slot="slotProps">
    <RouterLink to="/" :class="slotProps.class">
      <div class="flex justify-evenly items-center font-bold">
        <i class="pi pi-home" style="font-size: 1.5rem"></i>
        <div class="m-2">Home</div>
      </div>
    </RouterLink>
  </Button>
</template>
<script setup lang="ts"></script>
