<template>
  <div class="coins-wrap">
    <div v-for="coin in allCoins">
      <p v-for="property in coin">
        {{ property }}
      </p>
    </div>
    <div>
      <input v-model="searchedCoin" type="text" @keydown.enter="getPrice(searchedCoinPair)">
      <button @click="getPrice(searchedCoinPair)">Search</button>
    </div>

  </div>

</template>

<script setup lang="ts">

import { ref, computed, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useCoinsPriceStore } from "@/stores/coins-price";

const props = defineProps<{
  pair?: string,
  background: string
}>()

const store = useCoinsPriceStore()
const { getPrice } = store
const { allCoins } = storeToRefs(store)

const searchedCoin = ref('')
const searchedCoinPair = computed(() => {
  return searchedCoin.value.toUpperCase() + '-USD'
})

const btcPair = "BTC-USD"
const ethPair = "ETH-USD"

onMounted(() => {
  getPrice(btcPair)
  getPrice(ethPair)
})

</script>

<style lang="scss" scoped>
.coins-wrap {
  display: flex;
  justify-content: space-around;
}
</style>