<template>
  <div v-for="prop in allCoins.BTC">
    {{prop}}
  </div>
  <div v-for="prop in allCoins.ETH">
    {{prop}}
  </div>
  <input type="text" v-model="searchedCoin" @keydown.enter="getPrice(searchedCoinPair)">
  <button @click="getPrice(searchedCoinPair)">Search</button>
  <div v-for="prop in allCoins.otherCoin">
    {{prop}}
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