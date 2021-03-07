import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import config from "../config.json";

export default function AddStock (props) {
  const { loadBasicPortfolio } = props;
  const [open, setOpen] = React.useState(false);
  const [stockName, setStockName] = React.useState("");
  const [stockSymbol, setStockSymbol] = React.useState("");
  const [stockUrl, setStockUrl] = React.useState("");
  const [date, setPurchaseDate] = React.useState("");
  const [purchasePrice, setPurchasePrice] = React.useState("");
  const [purchaseQuantity, setPurchaseQuantity] = React.useState("");

  const openModal = async () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const newStock = {
      stockName,
      stockSymbol,
      stockUrl,
      date,
      price: purchasePrice,
      quantity: purchaseQuantity
    };

    await fetch(`${config.host}/api/add_stock`, {
      method: "POST",
      headers: {
        "Content-type": "application/json" 
      },
      body: JSON.stringify(newStock)
    });

    loadBasicPortfolio();

    closeModal();
  };

  const body = (
    <div className="ModalDiv">
      <h2> Add new stock </h2>
      <div>
        <TextField required id="standard-required" 
          label="Stock name" 
          onChange={e => setStockName(e.target.value)}
        />
        <TextField required id="standard-required" label="Stock symbol" 
          onChange={e => setStockSymbol(e.target.value)} className="margin-left-10"
        />
        <br/>
        <br/>
        <TextField required id="standard-required" label="Stock data source Url" 
          onChange={e => setStockUrl(e.target.value)}
        />
        <br/>
        <br/>
        <TextField required id="standard-required" label="Purchase Date"
          type="date"
          defaultValue="2021-01-01"
          onChange={e => setPurchaseDate(e.target.value)}
        />
        <TextField required id="standard-required" label="Purchase Price" 
          onChange={e => setPurchasePrice(e.target.value)} className="margin-left-10"
        />
        <TextField required id="standard-required" label="Purchase Quantity" 
          onChange={e => setPurchaseQuantity(e.target.value)} className="margin-left-10"
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
    <div>
      <Button variant="contained" color="primary" className="floatRight" onClick={openModal}>Add Stock</Button>
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

AddStock.propTypes = {
  loadBasicPortfolio: PropTypes.func
};