const express = require("express");
const router = express.Router();
router.use("/user", require("./user"));
router.use("/course", require("./course"));
module.exports = router;
