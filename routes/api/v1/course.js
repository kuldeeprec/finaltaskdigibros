const express = require("express");
const router = express.Router();
const courseApi = require("../../../controllers/api/v1/course");
router.get("/courseinfo", courseApi.courseinfo);
router.post("/create", courseApi.create);
router.post("/update", courseApi.update);
// router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);
module.exports = router;
