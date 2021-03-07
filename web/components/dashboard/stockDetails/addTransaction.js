import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import config from "../config.json";

export default function AddTransaction (props) {
  const { loadBasicPortfolio, stock } = props;
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantities] = React.useState("");

  const openModal = async () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const newTransaction = {
      action: "add",
      stockSymbol: stock.symbol,
      date,
      price,
      quantity
    };

    await fetch(`${config.host}/api/modify_transaction`, {
      method: "POST",
      headers: {
        "Content-type": "application/json" 
      },
      body: JSON.stringify(newTransaction)
    });

    loadBasicPortfolio();

    closeModal();
  };

  const body = (
    <div className="ModalDiv">
      <h2> Add new transaction </h2>
      <div>
        <TextField required id="standard-required" label="Date"
          type="date"
          defaultValue="2021-01-01"
          onChange={e => setDate(e.target.value)} className="margin-left-10"
        />
        <TextField required id="standard-required" label="Price" 
          onChange={e => setPrice(e.target.value)} className="margin-left-10"
        />
        <TextField required id="standard-required" label="Quantity" 
          onChange={e => setQuantities(e.target.value)} className="margin-left-10"
        />
        <br/>
        <br/>
        <br/>
        <Button type="submit" variant="contained" color="secondary" 
          onClick={closeModal} className="floatRight margin-left-10">Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" 
          onClick={onSubmit} className="floatRight">Confirm
        </Button>
      </div>
    </div>
  );

  return (
    <div className="addHistory">
      <IconButton aria-label="delete" className="floatRight" onClick={openModal}>
        <AddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={closeModal}
        className="modal"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

AddTransaction.propTypes = {
  loadBasicPortfolio: PropTypes.func,
  stock: PropTypes.object
};