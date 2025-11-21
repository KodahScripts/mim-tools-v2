<template>
  <div class="flex justify-between ms-5 me-5">
    <ToggleButton v-model="checked" class="w-48" onLabel="ID.4 / BUZZ" offLabel="General" />
    <Button severity="danger"><i class="pi pi-trash"></i></Button>
  </div>
  <div class="w-2/3 mx-auto">
    <VwCalcGeneralForm v-if="!checked" />
    <VwCalcOtherForm v-else />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import VwCalcGeneralForm from '@/forms/VwCalcGeneralForm.vue'
import VwCalcOtherForm from '@/forms/VwCalcOtherForm.vue'

const checked = ref(false)
</script>
