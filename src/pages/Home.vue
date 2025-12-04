<template>
  <div class="text-xl text-center m-5">Select a Tool</div>
  <div class="flex justify-evenly">
    <Button
      v-for="(link, index) in links"
      :key="`link-${index}`"
      asChild
      v-slot="slotProps"
      variant="outlined"
    >
      <RouterLink :to="link.path" :class="slotProps.class">
        <div class="flex justify-evenly items-center font-bold">
          <i :class="link.icon" style="font-size: 1.5rem"></i>
          <div class="m-2">{{ link.label }}</div>
        </div>
      </RouterLink>
    </Button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const links = ref([
  {
    label: 'VW Calculator',
    path: 'vw-calc',
    icon: 'pi pi-calculator',
  },
  {
    label: 'UTA Uploader',
    path: 'uta-upload',
    icon: 'pi pi-dollar',
  },
  {
    label: 'CC Uploader',
    path: 'cc-upload',
    icon: 'pi pi-credit-card',
  },
  {
    label: 'Employee Match',
    path: 'emp-match',
    icon: 'pi pi-user',
  },
])
</script>
