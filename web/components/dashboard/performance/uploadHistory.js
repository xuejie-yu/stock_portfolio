import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import config from "../config.json";

export default function UploadHistory(props) {
  const { loadBasicPortfolio } = props;
  const onFileChange = async ({ target }) => {
    let formData = new FormData();
    const file = target.files[0];
    if (file) {
      formData.append("file", file);
      await fetch(`${config.host}/api/add_history`, {
        method: "POST",
        headers: {
          "Content-Type": "text/csv",
        },
        body: formData,
      });
      loadBasicPortfolio();
      target.value = "";
    }
  };
  return (
    <div>
      <div>
        <Button variant="contained" component="label" className="floatRight" color="primary">
          Upload History
          <input id="inputFile" type="file" onChange={onFileChange} hidden />
        </Button>
        <h2>Performance</h2>
      </div>
    </div>
  );
}

UploadHistory.propTypes = {
  loadBasicPortfolio: PropTypes.func
};