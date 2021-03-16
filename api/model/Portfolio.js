import { toFixedFloat }from "../utils";

export default class Portfolio {
  constructor({ name = "", stocks = [] }) {
    this.name = name;
    this.stocks = this.moveSoldStockToEnd({ stocks }) || [];
    this.totalInvestment = this.calculateTotalInvestment({ stocks });
    this.totalGain = this.calculateTotalGain({ stocks });
    this.todayGain = this.calculateTodayGain({ stocks });
    this.totalValue = this.calculateTotalValue();
  }

  calculateTotalInvestment({ stocks }) {
    if (stocks.length === 0) return 0;
    let total = 0;
    stocks.forEach(stock => {
      total += stock.totalCost;
    });
    return toFixedFloat(total, 2);
  }

  calculateTotalGain({ stocks }) {
    if (stocks.length === 0) return 0;
    let total = 0;
    stocks.forEach(stock => {
      total += stock.totalGain;
    });
    return toFixedFloat(total, 2);
  }

  calculateTodayGain({ stocks }) {
    if (stocks.length === 0) return 0;
    let total = 0;
    stocks.forEach(stock => {
      total += stock.todayGain;
    });
    return toFixedFloat(total, 2);
  }

  calculateTotalValue() {
    return toFixedFloat(this.totalInvestment + this.totalGain, 2);
  }

  moveSoldStockToEnd ({ stocks }) {
    const activeStock = [];
    const soldStock = [];
    for(let i = 0; i < stocks.length; i++) {
      if (stocks[i].quantity === 0) {
        soldStock.push(stocks[i]);
      } else {
        activeStock.push(stocks[i]);
      }
    }
    return [...activeStock, ...soldStock];
  }
}