import React from "react";
import PropTypes from "prop-types";
import config from "../config.json";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteTransaction (props) {
  const { symbol, transactionIndex, loadBasicPortfolio } = props;
  const onDelete = async () => {
    const newTransaction = {
      action: "remove",
      symbol: symbol,
      transactionIndex
    };

    await fetch(`${config.host}/api/modify_transaction`, {
      method: "POST",
      headers: {
        "Content-type": "application/json" 
      },
      body: JSON.stringify(newTransaction)
    });

    loadBasicPortfolio();
  };

  return (
    <IconButton aria-label="delete" size="small" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  );
}

DeleteTransaction.propTypes = {
  symbol: PropTypes.string,
  transactionIndex: PropTypes.number,
  loadBasicPortfolio: PropTypes.func
};