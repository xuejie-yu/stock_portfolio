import fs from "fs";
import bunyan from "bunyan";
import Portfolio from "./model/Portfolio";
import Settings from "./model/Settings";
const DATA_DIR = "./data";
const PORTFOLIO_FILE = `${DATA_DIR}/portfolio.json`;
const SETTINGS_FILE = `${DATA_DIR}/settings.json`;
const log = bunyan.createLogger({name: "stock_portfolio_app"});


const toFixedFloat = (num, n) => {
  if (typeof num === "string") {
    num = parseFloat(num);
  }
  return parseFloat(num.toFixed(n));
};


const updatePortfolioFile = (portfolioData) => {
  const portfolio = {
    name: portfolioData.name,
    stocks: []
  };

  portfolioData.stocks.forEach(stock => {
    portfolio.stocks.push({
      name: stock.name,
      symbol: stock.symbol,
      url: stock.url,
      transactions: stock.transactions,
      priceHistory: stock.priceHistory
    });
  });
  try {
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(portfolio));
  } catch(error) {
    log.error(error, "Error in updatePortfolioFile");
  }
};

const getPortfolio = () => {
  let portfolio = "";
  try {
    const content = fs.readFileSync(PORTFOLIO_FILE);
    portfolio = JSON.parse(content);

  } catch (error) {
    if (!fs.existsSync(DATA_DIR)) {
      log.info("Create data directory");
      fs.mkdirSync(DATA_DIR);
    }
    log.info("Create new portfolio file");
    portfolio = new Portfolio({name: "new user", stocks: []});
    updatePortfolioFile(portfolio);
  }
  return portfolio;
};

const updateSettingToFile = (settings) => {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings));
  } catch(error) {
    log.error(error, "Error in updatePortfolioFile");
  }
};

const getSettingFromFile = () => {
  let settings = "";
  try {
    const content = fs.readFileSync(SETTINGS_FILE);
    settings = JSON.parse(content);
  } catch (error) {
    if (!fs.existsSync(DATA_DIR)) {
      log.info("Create data directory");
      fs.mkdirSync(DATA_DIR);
    }
    log.info("Create new settings file");
    settings = new Settings();
    updateSettingToFile(settings);
  }
  return settings;
};

export {
  toFixedFloat,
  updatePortfolioFile,
  getPortfolio,
  updateSettingToFile,
  getSettingFromFile,
  log,
};


