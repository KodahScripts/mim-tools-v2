<template>
  <div class="text-3xl m-5">MIM Toolbox - {{ routeName }}</div>
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const routeName = computed(() => route.name)
</script>
