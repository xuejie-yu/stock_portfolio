import React from "react";
import { useState, useEffect } from "react";
import StockTable from "./stockDetails/stockTable.js";
import AddStock from "./stockDetails/addStock.js";
import Settings from "./settings/settings.js";
import Overview from "./overview/overview.js";
import Performance from "./performance/performance.js";
import Grid from "@material-ui/core/Grid";
import config from "./config.json";

export default function Dashboard () {

  const [portfolio, setPortfolio] = useState({});

  const [autoRefresh, setAutoRefresh] = useState(false);

  const [intervalId, setIntervalId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const loadBasicPortfolio = async () => {
    const res = await fetch(`${config.host}/api/portfolio`);
    const portfolio = await res.json();
    portfolio.stocks.forEach(stock => {
      stock.totalPositive = stock.totalGain > 0;
      stock.todayPositive = stock.todayGain > 0;
    });
    setPortfolio(portfolio);
    setIsLoading(false);
  }

  const toggerSwitch = () => {
    setAutoRefresh(!autoRefresh);
    if (!autoRefresh) {
      setIntervalId(setInterval(loadBasicPortfolio, 10 * 1000));
    } else {
      clearInterval(intervalId);
    }
  }

  useEffect(() => {
    loadBasicPortfolio();
  }, []);

  return (
    <div className="dashboard">
      <Grid container>
        <Grid item xs={12} id="settingsDiv">
          <Settings autoRefresh={autoRefresh} toggerSwitch={toggerSwitch}></Settings>
        </Grid>
        <Grid item xs={12} id="overviewDiv">
          <Overview portfolio={portfolio} isLoading={isLoading}></Overview>
        </Grid>
        <Grid item xs={12} id="graphDiv">
          <div>
            <Performance portfolio={portfolio} loadBasicPortfolio={loadBasicPortfolio} isLoading={isLoading}></Performance>
          </div>
        </Grid>
        <Grid item xs={12} id="stockDetailsDiv">
          <div>
            <AddStock loadBasicPortfolio={loadBasicPortfolio}></AddStock>
            <h2>Stock Details</h2>
          </div>
          <StockTable stocks={portfolio.stocks} loadBasicPortfolio={loadBasicPortfolio} isLoading={isLoading}></StockTable>
        </Grid>
      </Grid>
    </div>
  );
}