import React from "react";
import PropTypes from "prop-types";
import config from "../config.json";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteStock (props) {
  const { stockIndex, loadBasicPortfolio } = props;
  const onDelete = () => {
    fetch(`${config.host}/api/delete_stock/${stockIndex}`, {
      method: "DELETE"
    });

    loadBasicPortfolio();
  };

  return (
    <IconButton aria-label="delete" size="small" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  );
}

DeleteStock.propTypes = {
  stockIndex: PropTypes.number
};