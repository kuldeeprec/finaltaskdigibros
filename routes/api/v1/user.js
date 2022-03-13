const express = require("express");
const router = express.Router();
const usersApi = require("../../../controllers/api/v1/users");
router.get("/userinfo", usersApi.userinfo);
router.get("/usercourses", usersApi.usercourses);
router.post("/create-session", usersApi.createSession);
router.post("/insertcourse", usersApi.insertcourse);
router.post("/signup", usersApi.signup);
router.post("/update", usersApi.update);

// router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);
module.exports = router;
