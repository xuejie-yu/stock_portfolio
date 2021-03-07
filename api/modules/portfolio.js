import Stock from "../model/Stock";
import Portfolio from "../model/Portfolio";
import { toFixedFloat, updatePortfolioFile, getPortfolio, getSettingFromFile, log }from "../utils";
const settings = getSettingFromFile();
const CURRENCY_RATE = toFixedFloat(settings.currencyRate, 2);

const loadPortfolio = () => {
  return new Promise((resolve, reject) => {
    const stocks = [];
    const portfolioData = getPortfolio();
    portfolioData.stocks.forEach(stockData => {
      const stock = new Stock(stockData);
      stocks.push(stock);
    });

    const stockEnrichPromises = stocks.map(stock => stock.enrich());

    Promise.allSettled(stockEnrichPromises)
      .then(() => {
        const portfolio = new Portfolio({stocks});
        updatePortfolioFile(portfolio);
        return resolve(portfolio);
      })
      .catch(err => {
        log.error({ err }, "Error in loadPortfolio");
        return reject(err);
      });
  });
};

const addStock = (stock) => {
  const portfolioData = getPortfolio();
  const quantity = toFixedFloat(stock.quantity, 2);
  const price = toFixedFloat(stock.price, 2);
  const newStock = {
    name: stock.stockName,
    symbol: stock.stockSymbol,
    url: stock.stockUrl,
    transactions: [
      {
        date: stock.date || "2021-01-01",
        quantity,
        price,
        cost: quantity * price
      }
    ]
  };
  portfolioData.stocks.push(newStock);
  updatePortfolioFile(portfolioData);
};

const deleteStock = (stockIndex) => {
  const portfolioData = getPortfolio();
  if (stockIndex > -1) {
    portfolioData.stocks.splice(stockIndex, 1);
    updatePortfolioFile(portfolioData);
  }
};

const addTransaction = (transaction) => {
  const portfolioData = getPortfolio();
  const stock = portfolioData.stocks.find(s => {
    return s.symbol === transaction.stockSymbol
  });
  if (stock) {
    const stockTransaction = {
      "date": transaction.date || "2021-01-01",
      "quantity": toFixedFloat(transaction.quantity, 2),
      "price": toFixedFloat(transaction.price, 2)
    };
    stock.transactions.push(stockTransaction);
    stock.transactions = stock.transactions.sort((tranA, tranB) => {
      return new Date(tranA.date).getTime() - new Date(tranB.date).getTime();
    });
    updatePortfolioFile(portfolioData);
  }
};

const addHistory = async (file) => {
  const portfolioData = getPortfolio();
  const fileArray = file.split("\n");
  const symbol = fileArray[1].split(";")[2].replace("filename=\"", "").replace(".csv\"", "").trim();
  const data = fileArray.slice(5, fileArray.length - 2);
  const stock = portfolioData.stocks.find(stock => stock.symbol === symbol);
  if (stock) {
    stock.priceHistory = {};
    const minDate = stock.transactions[0].date;
    data.forEach(priceDay => {
      const priceDayArray = priceDay.split(",");
      if (priceDayArray[0] >= minDate) {
        stock.priceHistory[priceDayArray[0]] = toFixedFloat(priceDayArray[4] * CURRENCY_RATE, 2);
      }
    });
    updatePortfolioFile(portfolioData);
  }
};

const removeTransaction = async (transaction) => {
  const portfolioData = getPortfolio();
  const stock = portfolioData.stocks.find(stock => stock.symbol === transaction.symbol);
  if (stock) {
    stock.transactions.splice(transaction.transactionIndex, 1);
    updatePortfolioFile(portfolioData);
  }
};

export {
  loadPortfolio,
  addTransaction,
  addStock,
  addHistory,
  deleteStock,
  removeTransaction
};