import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import Switch from "@material-ui/core/Switch";
import config from "../config.json";

export default function Settings (props) {
  const { autoRefresh, toggerSwitch } = props;
  const [open, setOpen] = React.useState(false);
  const [selector, setSelector] = React.useState("");
  const [currencyRate, setCurrencyRate] = React.useState(1);

  const openModal = async () => {
    const res = await fetch(`${config.host}/api/settings`)
    const settings = await res.json();
    setSelector(settings.selector);
    setCurrencyRate(parseFloat(settings.currencyRate));
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    const newSettings = {
      selector,
      currencyRate
    };    
    fetch(`${config.host}/api/settings`, {
      method: "POST",
      headers: {
        "Content-type": "application/json" 
      },
      body: JSON.stringify(newSettings)
    });

    closeModal();
  };

  const modalBody = (
    <div className="ModalDiv">
      <h2> Settings </h2>
      <div>
        <TextField required id="standard-basic" label="HTML Selecotr for 'Current Price'"
          onChange={e => setSelector(e.target.value)} fullWidth="true"
          type="string"
          value={selector}
        />
        <br/>
        <br/>
        <br/>
        <h2> Currency Rate</h2>
        <TextField required id="standard-basic"
         label="Currency rate used to convert the imported currency 
         to target currency"
         onChange={e => setCurrencyRate(e.target.value)} fullWidth="true" 
         type="number" 
         value={currencyRate}
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
      <IconButton aria-label="delete" className="floatRight padding-top-6" onClick={openModal}>
        <SettingsIcon />
      </IconButton>
      <Switch
        checked={autoRefresh}
        onChange={toggerSwitch}
        color="primary"
        name="autoRefreshSwitch"
        inputProps={{ "aria-label": "primary checkbox" }}
        className="floatRight margin-top-5"
      />
      <Typography className="floatRight margin-top-10">Auto Refresh</Typography>
      <Modal
        open={open}
        onClose={closeModal}
        className="modal"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
}

Settings.propTypes = {
  autoRefresh: PropTypes.bool,
  toggerSwitch: PropTypes.func
};