import { toFixedFloat }from "../utils";

export default class Portfolio {
  constructor({ name, stocks }) {
    this.name = name;
    this.stocks = stocks || [];
    this.totalInvestment = this.calculateTotalInvestment({ stocks });
    this.totalGain = this.calculateTotalGain({ stocks });
    this.todayGain = this.calculateTodayGain({ stocks });
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
}