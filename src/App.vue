<template>
  <div v-if="routeName != 'Home'" class="absolute top-2 left-2"><HomeButton /></div>
  <div class="relative top-15">
    <div class="text-3xl text-center">MIM Toolbox - {{ routeName }}</div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HomeButton from './components/HomeButton.vue'

const route = useRoute()
const routeName = computed(() => route.name)
</script>
