const User = require("../../../models/user");
const Course = require("../../../models/course");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.signup = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(401, {
        message: "Invalid password",
      });
    }
    let user = await User.findOne({ userId: req.body.userId });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let user = await User.create({
        username: req.body.username,
        userId: req.body.userId,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
      });
      if (user) {
        return res.json(200, {
          message: "succesfully sign up",
        });
      }
    }
    return res.json(401, {
      message: "user already exists",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ userId: req.body.userId });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!user || !validPassword) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    var options = {
      expires: new Date(Date.now() + 1000000),
      httpOnly: true,
      sameSite: "strict",
    };
    const token = jwt.sign(user.toJSON(), "kuldeep", { expiresIn: "1000000" });
    res.cookie("jwt", token, options);
    return res.send("succes fully login");
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.userinfo = async function (req, res) {
  try {
    let user = await User.findOne({ userId: req.body.userId });
    if (user) {
      return res.json(200, {
        message: "user found succesfully",
        user: user,
      });
    }
    return res.json(401, {
      message: "user not exists",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};
module.exports.usercourses = async function (req, res) {
  try {
    let userCourses = await User.findOne({ userId: req.body.userId }).populate(
      "courses",
      "courseName"
    );
    if (userCourses) {
      return res.json(200, {
        message: "user found succesfully",
        userCourses: userCourses,
      });
    }
    return res.json(401, {
      message: "userCourses not exists",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};
module.exports.update = async function (req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = await User.updateOne(
      { userId: req.body.userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: hashedPassword,
        },
      }
    );
    if (user) {
      return res.json(200, {
        message: "succesfully updated",
      });
    }
    return res.json(401, {
      message: "not found user",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};

module.exports.insertcourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      CourseName: req.body.CourseName,
    });
    if (!course) {
      return res.json(200, {
        message: "course not found",
      });
    }

    const user = await User.findOne({ userId: req.body.userId });
    user.courses.push(course);
    await user.save();
    return res.json(200, {
      message: "course inserted succesfully",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};
