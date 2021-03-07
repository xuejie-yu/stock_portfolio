import {updateSettings, getSettings} from "../../api/modules/settings";
import { log }from "./utils";

export default function handler(req, res) {
  log.info("Received: ", req.url);
  return new Promise((resolve, reject) => {
    if (req.method === "GET") {
      const settings = getSettings();
      res.json(settings);
      return resolve();
    } else if (req.method === "POST") {
      const settings = req.body;
      updateSettings(settings);
      res.json({ status: "success" });
      return resolve();
    } else {
      res.status(404).json({ message: "Please use POST. "});
      return reject();
    }
  });
}