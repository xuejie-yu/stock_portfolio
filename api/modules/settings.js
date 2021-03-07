import { getSettingFromFile, updateSettingToFile } from "../utils";

const updateSettings = (settings) => {
  const settingsData = getSettingFromFile();
  settingsData.selector = settings.selector || "";
  settingsData.currencyRate = parseFloat(settings.currencyRate) || 1;
  updateSettingToFile(settingsData);
};

const getSettings = () => {
  return getSettingFromFile();
};

export {
  updateSettings,
  getSettings
};