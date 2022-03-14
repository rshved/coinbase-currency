<template>
  <div class="coins-wrap">
    <div v-for="coin in allCoins">
      <CoinCheck :coin="coin" />
    </div>
  </div>
  <div class="other">
    <input v-model="searchedCoin" type="text" @keydown.enter="searchCoin" placeholder="Type coin name">
    <button @click="searchCoin">Search</button>
    <h3>
      Last Update: {{dateNow}}
    </h3>
  </div>


</template>

<script setup lang="ts">

import {ref, computed, onMounted, onBeforeUnmount, watch} from "vue";

import { storeToRefs } from "pinia";
import { useCoinsPriceStore } from "@/stores/coins-price";

import CoinCheck from '@/components/certain-coin.vue'

defineProps<{
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
const lastSearchedCoin = ref('')

const btcPair = "BTC-USD"
const ethPair = "ETH-USD"
const dateNow = ref('')

const searchCoin = () => {
  getPrice(searchedCoinPair.value)
  lastSearchedCoin.value = searchedCoinPair.value
}
onMounted(() => {
  getPrice(btcPair)
  getPrice(ethPair)
  dateNow.value =  new Date().toLocaleString()
})

const latestInfo = setInterval(() => {
  getPrice(btcPair)
  getPrice(ethPair)
  if (allCoins.value.otherCoin.formatted) getPrice(lastSearchedCoin.value)
  dateNow.value =  new Date().toLocaleString()
}, 30000)

onBeforeUnmount(() => clearInterval(latestInfo))
</script>

<style lang="scss" scoped>
.coins-wrap {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px
}

.other {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  input {
    padding: 7px 10px;
    border: 2px solid #000;
    border-radius: 3px;
    margin-right: 10px;
    font-size: 24px;
  }
  button {
    padding: 7px 10px;
    border: 2px solid #000;
    border-radius: 3px;
    font-size: 20px;
  }
}
</style>