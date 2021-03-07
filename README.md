# Local Stock Portfolio App
![Complete App](/docs/complete.png)
# Background
Nowadays, for the stock investor, you always have multiple accounts from multiple brokers. It is beneficial to have the portfolio separated for different reasons. However, you may still want a central place to have an overview of your complete investment so that you can have live and historical data for your investment. There are a lot of investors use EXCEL to manage the portfolio which is clean and easy. But it requires quite some efforts to keep it up to date and maintain it. This small app is served for this purpose with reduced effort.


PS: The app is for personal usage and still in early prototype. 

PS: All data stays with you without uploading to any external server.

# Components
The app has four sections: settings, overview, performance and stock details.

## Settings
Settings section is used for the basic setting for your stock portfolio.
### Auto Refresh
The toggle button is used to activate/deactivate the automatic polling of live stock price with the pre-configured interval of 10 seconds.
### Gear Icon
The settings icon provides a modal for details settings.
#### HTML Selector for 'Current Price'
It is used for polling live data from specific website similar to `IMPORTXML` function in EXCEL. The value should be the HTML selector from the webpage. The details about how to get it will be explain in the [Installation](#Installation) section.
### Currency Rate
It is used to convert the price of historical price to your current currency. For example, if you have your currency with `Euro` but your historical data is downloaded from some sources, e.g. Yahoo Finance that contains the price in `Dollar`, you will be able to convert the price to `Euro` with the value specified here. In the case of `Dollar` to `Euro`, the value should be `0.8`.
## Overview
The overview section displays the overview of the investment.
### Avatar
A simple image you would like to use for the portfolio.
#### Total Investment
The `Total Investment` you have. It is the summation of the cost for your current holding stock and gain/loss for the stock your sold. For example, if you currently hold 10 shares of stock A with price 20, and have sold stock B with gain of 50, the total investment will be 10 * 20 - 50 = 50. It only contains the investment your put in the stocks without cash.
### Total Gain
The `Total Gain` is the simply the difference between your total investment and the total value of your stocks.
### Today's Gain
The `Today's Gain` is the difference between the current total value of your stocks and the value yesterday.
## Performance
The performance shows the daily gain/loss of your individual stock since your purchase. By default, it starts to display the line chart after you starting to use the app. 

If you would like to have the historical data, you can use the `Upload History` button on the top right corner of the chart to import the CSV file with historical data to have complete view. So far, the app only accept the CSV file downloaded from Yahoo Finance. 
### Stock Details
The stock details section display the overview of your stocks. It has different columns with different metrics. You can use the `Add stock` button to add new stock to your portfolio.

For adding the stock, there are multiple parameters needed.
- `stock name`, e.g. `Gamestop` is the name your want to display for the stock
- `Stock symbol`, e.g. `GME` is the symbol used in the app internally for the logic. For example, this symbol should be unique and correctly input for different calculations. For example, the CSV for historical price should have the name `GME.csv` so that it can be linked to this stock. 
- `Stock data source url` is the website you poll the live price from
- `Purchase Date` is the date when you buy the stock. It will affect the performance chart for the historical gain/loss.
- `Purchase Price` is the price you buy the stock
- `Purchase Quantity` is the number of shares you purchase

Once you add a stock to your portfolio, you will see it listed in the table. By expanding the `arrow` sign on the left, you can modify the transaction to the stock, e.g. Buy or Sell the stock.

# Installation
## Prerequisite 
This app is build based on the [Nextjs](https://nextjs.org/).

In order to run the app, please make sure you have [Node.js](https://nodejs.org/en/) installed on your computer. To verify that you have successfully installed the node.js, open the `Terminal` from your laptop and type `npm`. If you see the help document of `npm`, e.g. `Usage: npm <command>`, you are good. If not, please find the documentation of Nodejs installation on the Internet.

## How to download the app
Download the repository with `git` or just simply download as `zip` file and uncompressed it. Put the app in proper place that you feel comfortable with.
## How to start the app
- Step 1, Open `Terminal` from your laptop.
- Step 2, Navigate to the root of the application. For the users without deep knowledge about `Terminal`, simply type `cd` and space. Then drag/drop the folder to the terminal, the path should be filled automatically. Then press `Enter` button. Now you should be in the folder with the display similar to `~/Downalods/stock_porfolio`.
- Step 3, Type `npm install` to install all the dependency needed for the app. **This is required only for first time.**
- Step 4, Type `npm run build` to build the app for your local environment. You should see the message like `info  - Generating static pages` if you have it successfully built. **This is required only for first time.**
- Step 5, Type `npm start` to start the app. You should see the message `ready - started server on http://localhost:3000`.
- Open the browser and type `localhost:3000`, you should be able to see the app.

Step 1,2,5 are required for starting the app. Step 3,4 are only required for the first time.
## How to configure the portfolio
Once you have the app running properly, you should see the page, like 
![initial page](/docs/init.png)
### Settings
To set up the **live price** fetching for your stock, click the `gear` icon on the top right corner of the page 

![setting icon](/docs/settings_icon.png). 

Then you will see a dialog pops up 

![setting dialog](/docs/settings_dialog.png). 

- For the value for `HTML Selector for 'Current Price'`, you need to obtain it with some steps. These steps can be too technical but don't worry if you do not understand it. 
Here, I will simply use `Yahoo Finance` as example.   
  - Open the web page that you want to get the price from, e.g. (https://finance.yahoo.com/quote/GME/history?p=GME) 
  - `Right click` the value you want to get. e.g. the price `137.74` is the value I want to poll down 
  
  ![yahoo selector](/docs/yahoo_selector.png)


  - Click `Inspect`, you should see a dialog pops up with the source code of the webpage. The node you just clicked is highlighted with blue background. ![yahoo selector 2](/docs/yahoo_selector_2.png)
  - `Right Click` the node and click `Copy` and then click `Copy Selector`
  - Go back to the app the paste the `selector` you just copy. It is a string may not be understandable. 
- Now your dialog should be like 

![settings dialog after](/docs/settings_dialog_after.png)
- For the `Currency Rate`, it is only required if the currency you fetch is different from the currency used in historical price you import. If they are the same, leave it as 1. If not, e.g. the price you fetch is in `Euro` and the historical price is in `Dollar`, then input 0.8 if `1 Dollar = 0.8 Euro`.
- Click the `Confirm` button
## Add stock
To add a stock to your portfolio, use the `Add Stock` button in the `Stock Details` section. You should see a dialog pops up to input the details. Input the data according to your situation. Here, the `Stock data source Url` is the website link of the *live stock price* you want to fetch from, e.g. `https://finance.yahoo.com/quote/GME?p=GME` . An example of input is like 

![Add stock](/docs/add_stock.png)

After stock is added, it will be displayed in the table, 

![stock added](/docs/stock_added.png)

The `Current Price` should be displayed properly if you have the `Settings` configured properly.

If you have further transaction, click the `+` button in the graph to add more `transaction`. 
- For purchase, put `quantity` with positive value, e.g. `100`
- For sell, put `quantity` with negative value, e.g. `-100`

## Performance graph configuration
So far, you should have the stock graph without history. You can upload the historical price as CSV file to the app to have the complete overview of the performance. (So far, the app only support historical data from Yahoo Finance. It will be extended afterwards). For example, to add the performance history for gamestop,
- Open the webpage https://finance.yahoo.com/quote/GME/history?p=GME, click `Download` button to get `GME.csv` locally. Please make sure the `Time Period` covers all your transaction dates so that you can have complete history
![yahoo download](/docs/yahoo_download.png)
- Back to the app, Click the `Upload history` and select the file `GME.csv`. Now you should see the graph is updated with historical data. The graph shows the gain/loss over time for your stock individually.
![Gamestop performance](/docs/gme_performance.png)
- If in any cases the historical price is not complete, for example, you did not use it for several days, re-upload the history will overwrite the old history.


## Auto Refresh the live price
You can toggle the `Auto Refresh` button at the top of the page next to the `settings` icon to get live data every 10 seconds. 

## Change Avatar
You can use any image to replace the default avatar,by replacing the image in `/public` folder. Please make sure the image you use have the name `img.png`.


# Advance Usage
The data is stored in the `/data` folder in the app. For advanced user, you can modify the files inside if needed.