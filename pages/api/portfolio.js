const {loadPortfolio} = require("../../api/modules/portfolio");
import { log }from "./utils";

export default function handler(req, res) {
  log.info(`Received: ${req.url}`);
  return new Promise((resolve, reject) => {
    loadPortfolio()
      .then((portfolio) => {
        res.json(portfolio);
        return resolve();
      })
      .catch(() => {
        res.status(500).json({ error: "Error in fetching portfolio from file" });
        return reject();
      });
  });
}