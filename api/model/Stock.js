import jsdom from "jsdom";
import { toFixedFloat, getSettingFromFile, getPreviousDay }from "../utils";

const { JSDOM } = jsdom;

export default class Stock {
  constructor(stockData) {
    this.name = stockData.name;
    this.symbol = stockData.symbol;
    this.url = stockData.url;
    this.transactions = stockData.transactions;
    this.priceHistory = stockData.priceHistory || {};

    this.totalCost = 0;
    this.quantity = 0;
    this.currentValue = 0;
    this.averagePrice = 0;
    this.currentPrice = 0;
    this.todayGain = 0;
    this.totalGain = 0;
    this.todayPriceChange = 0;
  }

  calculateQuantity() {
    return this.transactions.reduce((sum, transaction) => {
       return sum + transaction.quantity;
    }, 0);
  }

  calculateTotalCost() {
    return toFixedFloat(this.transactions.reduce((sum, transaction) => {
      return sum + transaction.price * transaction.quantity;
    }, 0), 2);
  }

  calculateCurrentValue() {
    if (this.quantity === 0) return 0;
    return toFixedFloat(this.currentPrice * this.quantity, 2);
  }

  calculateAveragePrice() {
    if (this.quantity === 0) return 0;
    return toFixedFloat(this.totalCost / this.quantity, 2);
  }

  calculateTotalCostForEachPurchase() {
    this.transactions.forEach(transaction => {
      transaction.cost = toFixedFloat(transaction.quantity * transaction.price, 2);
    });
  }

  async getCurrentPrice() {
    if (this.quantity === 0) return 0;
    const doc = await fetch(this.url);
    const htmlContent = await doc.text();
    const dom = new JSDOM(htmlContent);
    const settings = getSettingFromFile();
    const selector = settings.selector;
    if (selector.length !== 0) {
      return toFixedFloat(dom.window.document.querySelector(selector).textContent.replace(",", "."), 2);
    }
    return 0;
  }

  calculateTotalGain() {
    return toFixedFloat(this.currentValue - this.totalCost, 2);
  }

  calculateGainHistory() {
    if (!this.priceHistory || this.quantity === 0) return;
    const dates = Object.keys(this.priceHistory).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const maxDate = dates[dates.length - 1];
    let gainsForCurrentStock = {};
    let cost = 0;
    let quantity = 0;
    const newTransactions = this.consolidateTransaction({ transactions: this.transactions });
    const transactions = [...newTransactions, {"date": maxDate}];
    for (let i = 1; i < transactions.length; i++) {
      const start = new Date(transactions[i - 1].date);
      const end = new Date(transactions[i].date);
      cost += transactions[i - 1].cost;
      quantity += transactions[i - 1].quantity;
      const avg = toFixedFloat(cost / quantity, 2);
      for (let curr = start; curr <= new Date(end); curr.setUTCDate(curr.getUTCDate() + 1)) {
        gainsForCurrentStock[new Date(curr).toISOString().substring(0, 10)] = { price: avg, quantity };
      }
    }
    const gains = [];
    dates.forEach(date => {
      const transaction = gainsForCurrentStock[date];
      gains.push([date, 
        toFixedFloat((this.priceHistory[date] - transaction.price) * transaction.quantity, 2)]);
    });
    return gains;
  }

  consolidateTransaction ({ transactions }) {
    const transactionHistory = {};
    transactions.forEach(transaction => {
      if (!transactionHistory[transaction.date]) {
        transactionHistory[transaction.date] = {
          cost: transaction.cost,
          quantity: transaction.quantity
        };
      } else {
        transactionHistory[transaction.date].cost += transaction.cost;
        transactionHistory[transaction.date].quantity += transaction.quantity;
      }
    });
    const newTransactions = [];
    Object.keys(transactionHistory).forEach(date => {
      newTransactions.push({
        date: date,
        cost: transactionHistory[date].cost,
        quantity: transactionHistory[date].quantity,
      })
    });
    return newTransactions;
  }

  calculateTodayGain() {
    if (this.quantity === 0 || !this.priceHistory || Object.keys(this.priceHistory).length === 0) return 0;
    const previousDay = getPreviousDay();
    const prePrice = this.priceHistory[previousDay] || 0;
    console.log(prePrice)
    console.log(this.currentPrice)
    return toFixedFloat((this.currentPrice - prePrice) * this.quantity, 2);
  }

  calculateTodayPriceChange() {
    if (!this.priceHistory || Object.keys(this.priceHistory).length === 0 || this.quantity === 0) return 0;
    let yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    yesterday = yesterday.toISOString().substring(0, 10);
    const prePrice = this.priceHistory[yesterday];
    return toFixedFloat(this.currentPrice - prePrice, 2);
  }

  updatePriceHistory() {
    if (this.quantity === 0) return;
    const today = new Date().toISOString().substring(0, 10);
    this.priceHistory[today] = this.currentPrice;
  }


  async enrich() {
    this.quantity = this.calculateQuantity();
    this.totalCost = this.calculateTotalCost();
    this.averagePrice = this.calculateAveragePrice();
    this.currentPrice = await this.getCurrentPrice();
    this.currentValue = this.calculateCurrentValue();
    this.totalGain = this.calculateTotalGain();
    this.calculateTotalCostForEachPurchase();
    this.gains = this.calculateGainHistory();
    this.todayGain = this.calculateTodayGain();
    this.todayPriceChange = this.calculateTodayPriceChange();
    this.updatePriceHistory();
  }
}