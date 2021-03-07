import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddTransaction from "./addTransaction";
import DeleteStock from "./deleteStock";
import DeleteTransaction from "./deleteTransaction";

function Row(props) {
  const { stock, stockIndex, loadBasicPortfolio } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow className={stock.quantity === 0 ? "grayBackground" : ""}>
        <TableCell key="tablecell-11">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" key={`${stock.symbol}-name`} component="th" scope="row">
          {stock.name}
        </TableCell>
        <TableCell align="center" key={`${stock.symbol}-quantities`}>{stock.quantity}</TableCell>
        <TableCell align="center" key={`${stock.symbol}-totalCost`}>{stock.totalCost}</TableCell>
        <TableCell align="center" key={`${stock.symbol}-averagePrice`}>
          {stock.quantity > 0 ? stock.averagePrice : "-"}
        </TableCell>
        <TableCell align="center" key={`${stock.symbol}-currentPrice`} 
          className={stock.todayPositive ? "positive" : "negative"}>
            {stock.quantity > 0 ? `${stock.currentPrice} (${stock.todayPriceChange})` : "-"}
        </TableCell>
        <TableCell align="center" key={`${stock.symbol}-todayGain`} 
          className={stock.todayPositive ? "positive" : "negative"}>
            {stock.quantity > 0 ? stock.todayGain : "-"}
        </TableCell>
        <TableCell align="center" key={`${stock.symbol}-todayGainPercentage`} 
          className={stock.todayPositive ? "positive" : "negative"}>
          {stock.quantity > 0 ? ((stock.todayGain / stock.totalCost) * 100).toFixed(2) + "%" : "-"}
        </TableCell>
        <TableCell align="center" key={`${stock.symbol}-totalGain`} 
          className={stock.totalPositive ? "positive" : "negative"}>{stock.totalGain}
        </TableCell>
        <TableCell align="center" key={`${stock.symbol}-totalGainPercentage`} 
          className={stock.totalPositive ? "positive" : "negative"}>
          {stock.quantity > 0 ? ((stock.totalGain / stock.totalCost) * 100).toFixed(2) + "%" : "-"}
        </TableCell>
        <TableCell align="center">
          <DeleteStock stockIndex={stockIndex}></DeleteStock>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" className="floatLeft">
                Transactions
              </Typography>
              <AddTransaction stock={stock} loadBasicPortfolio={loadBasicPortfolio}></AddTransaction>
              <Table size="small" aria-label="purchases" className="grayBackground">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" key={`${stock.symbol}-history-date`}>Date</TableCell>
                    <TableCell align="center" key={`${stock.symbol}-history-quantity`}>Quantity</TableCell>
                    <TableCell align="center" key={`${stock.symbol}-history-purchasePrice`}>Price</TableCell>
                    <TableCell align="center" key={`${stock.symbol}-history-totalCost`}>Cost</TableCell>
                    <TableCell align="center" key={`${stock.symbol}-transaction-delete`}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stock.transactions.map((transaction, transactionIndex) => (
                    <TableRow key={`${stock.symbol}-transaction-${transaction.date}`}>
                      <TableCell component="th" scope="row" align="center" key={`${stock.symbol}-transaction-date-${transaction.date}`}>
                        {transaction.date}
                      </TableCell>
                      <TableCell align="center" key={`${stock.symbol}-transaction-quantity-${transaction.date}`}>{transaction.quantity}</TableCell>
                      <TableCell align="center" key={`${stock.symbol}-transaction-purchasePrice-${transaction.date}`}>{transaction.price}</TableCell>
                      <TableCell align="center" key={`${stock.symbol}-transaction-cost-${transaction.date}`}>
                        {transaction.cost}
                      </TableCell>
                      <TableCell align="center">
                        <DeleteTransaction symbol={stock.symbol} transactionIndex={transactionIndex} loadBasicPortfolio={loadBasicPortfolio}></DeleteTransaction>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function StockTable (props) {
  const { stocks, loadBasicPortfolio } = props;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" key={"header-arrow"} />
              <TableCell align="center" key={"header-symbol"}>Symbol</TableCell>
              <TableCell align="center" key={"header-quantities"}>Quantity</TableCell>
              <TableCell align="center" key={"header-totalCost"}>Total Cost</TableCell>
              <TableCell align="center" key={"header-averagePrice"}>Average Price</TableCell>
              <TableCell align="center" key={"header-currentPrice"}>Current Price</TableCell>
              <TableCell align="center" key={"header-todayGain"}>Todays&#39; Gain / Loss</TableCell>
              <TableCell align="center" key={"header-todayGainPercentage"}>Todays&#39; Gain / Loss (%) </TableCell>
              <TableCell align="center" key={"header-totalGain"}>Total Gain / Loss</TableCell>
              <TableCell align="center" key={"header-totalGainPercentage"}>Total Gain / Loss (%) </TableCell>
              <TableCell align="center" key={"header-delete"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks && stocks.map((stock, idx) => (
              <Row key={stock.name} stock={stock} stockIndex={idx} loadBasicPortfolio={loadBasicPortfolio}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

StockTable.propTypes = {
  stocks: PropTypes.array,
  loadBasicPortfolio: PropTypes.func
};

Row.propTypes = {
  stock: PropTypes.object,
  stockIndex: PropTypes.number,
  loadBasicPortfolio: PropTypes.func
};