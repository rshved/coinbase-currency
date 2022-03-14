<template>
  <Transition v-if="coin.name" mode="in-out">
    <div class="info-container">
      <h1 :key="coin.formatted">{{coin.name}}</h1>
      <h2>{{coin.formatted}}</h2>
      <ArrowIndicator />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import ArrowIndicator from '@/components/arrow-indicator.vue'

const props = defineProps<{
  coin: {
    money: number,
    formatted: string,
    name: string
  }
}>()
</script>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .info-container {
    border: 2px solid #000;
    padding: 20px 55px;
    text-align: center;
    box-shadow: 0 3px 10px rgb(0, 0, 0 / 0.3);
  }
</style>