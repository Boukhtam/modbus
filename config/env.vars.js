require("dotenv").config();

module.exports = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost/mean",
  DATA_HOST_02: process.env.DATA_HOST_02 || "", 
  DATA_HOST_03: process.env.DATA_HOST_03 || "",
};
