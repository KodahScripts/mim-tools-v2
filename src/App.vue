<template>
  <div v-if="routeName != 'Home'" class="absolute top-2 left-2">
    <BackButton useLabel useArrow />
  </div>
  <div class="relative top-15">
    <div class="text-3xl text-center">
      <span v-if="isHome">MiM Toolbox</span>
      <span v-else-if="isCalc">VW Calculator</span>
      <span v-else>{{ `${selectedStore} ${routeName}` }}</span>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView, useRoute } from 'vue-router'
import { useGlobalStore } from './stores/global'
import BackButton from './components/BackButton.vue'
const store = useGlobalStore()
const { selectedStore } = storeToRefs(store)
const route = useRoute()
const routeName = computed(() => String(route.name))
const isHome = computed(() => route.name === 'Home')
const isCalc = computed(() => String(route.name).includes('VW'))
</script>
