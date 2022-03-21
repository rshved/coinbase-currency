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
    allCoins: {} as coins,
  }),

  getters: {},

  actions: {
    async getPrice(payload: string) {

      const { data } = await (await fetch(`https://api.coinbase.com/v2/prices/${payload}/buy`)).json()

      this.allCoins[data.base] = {
        money: parseFloat(data.amount),
        formatted: new Intl.NumberFormat('en-us',{
          style: 'currency',
          currency: data.currency
        }).format(data.amount),
        name: data.base
      }
    }
  }
})
