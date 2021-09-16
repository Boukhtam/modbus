const mongoose = require("mongoose");
const ENV_VARS = require("./env.vars");

mongoose.connect(ENV_VARS.MONGO_URL, (err) => {
  console.log("connected to mongodb")
})
