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
    <button @click="store.$reset()">Reset</button>
  </div>

</template>

<script setup lang="ts">
import {ref, computed, onMounted, onBeforeUnmount} from "vue";
import { storeToRefs } from "pinia";
import { useCoinsPriceStore } from "@/stores/coins-price";

import CoinCheck from '@/components/certain-coin.vue'

const store = useCoinsPriceStore()
const { getPrice } = store
const { allCoins } = storeToRefs(store)

const btcPair = "BTC-USD"
const ethPair = "ETH-USD"
const dateNow = ref('')

onMounted(() => {
  getPrice(btcPair)
  getPrice(ethPair)
  dateNow.value = new Date().toLocaleString()
})

const latestInfo = setInterval(() => {
  for (const coin in allCoins.value) {
    getPrice(`${coin}-USD`)
  }
  dateNow.value = new Date().toLocaleString()
}, 5000)

onBeforeUnmount(() => clearInterval(latestInfo))

//Search
const searchedCoin = ref('')
const searchedCoinPair = computed(() => {
  return searchedCoin.value.toUpperCase() + '-USD'
})

const searchCoin = () => {
  getPrice(searchedCoinPair.value)
  searchedCoin.value = ''
}
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