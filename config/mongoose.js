const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kuldeep:12345@cluster0.g3fzb.mongodb.net/finaltask?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});
module.exports = db;
