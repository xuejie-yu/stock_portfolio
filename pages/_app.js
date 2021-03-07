import "../web/styles/global.scss";
import "../web/styles/dashboard.scss";
import "../web/styles/overview.scss";
import "../web/styles/performance.scss";
import "../web/styles/stockDetails.scss";
import React from "react";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};