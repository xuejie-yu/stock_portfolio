import React from "react";
import PropTypes from "prop-types";
import config from "../config.json";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

export default function DeleteStock (props) {
  const { stockIndex, stockName, loadBasicPortfolio } = props;
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = async () => {

    await fetch(`${config.host}/api/delete_stock/${stockIndex}`, {
      method: "DELETE"
    });
    loadBasicPortfolio();

    closeModal();
  };

  const body = (
    <div className="ModalDiv">
      <h2> Are you sure to delete the stock {stockName} ? </h2>
        <Button type="submit" variant="contained" color="secondary" 
          onClick={closeModal} className="floatRight margin-left-10">Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" 
          onClick={onSubmit} className="floatRight">Confirm
        </Button>
    </div>
  );

  return (
    <div>
      <IconButton aria-label="delete" size="small" onClick={openModal}>
        <DeleteIcon />
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

DeleteStock.propTypes = {
  stockIndex: PropTypes.number,
  stockName: PropTypes.string,
  loadBasicPortfolio: PropTypes.func
};