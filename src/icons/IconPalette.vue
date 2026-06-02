<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="13.5" cy="6.5" r="2.5"/>
    <circle cx="19" cy="17" r="2"/>
    <circle cx="6" cy="17" r="2"/>
    <path d="M12 8a7 7 0 1 0 7 7"/>
    <path d="M12 8v4l3 2"/>
  </svg>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 18 })
</script>
