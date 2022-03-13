import { defineStore } from 'pinia'

interface coinFormat {
  formatted: string;
  money: number;
  name: string
}

interface coins {
  [key: string]: coinFormat
}

export const useCoinsPriceStore = defineStore({
  id: 'coins-price',
  state: () => ({
    allCoins: {
      BTC: {} as coinFormat,
      ETH: {} as coinFormat,
      otherCoin: {} as coinFormat
    } as coins,
  }),
  getters: {

  },
  actions: {
    async getPrice(payload: string) {

      const { data } = await (await fetch(`https://api.coinbase.com/v2/prices/${payload}/spot`)).json()

      const coin = {
        money: parseFloat(data.amount),
        formatted: new Intl.NumberFormat('en-us',{
          style: 'currency',
          currency: data.currency
        }).format(data.amount),
        name: data.base
      }

      if (this.allCoins[data.base]) this.allCoins[data.base] = coin
      else this.allCoins.otherCoin = coin
    },
  }
})
