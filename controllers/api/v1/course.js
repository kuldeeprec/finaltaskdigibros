const Course = require("../../../models/course");
module.exports.create = async function (req, res) {
  try {
    let course = await Course.findOne({ courseName: req.body.courseName });
    if (!course) {
      let course = await Course.create({
        courseName: req.body.courseName,
        coursedescriptions: req.body.coursedescriptions,
        videolink: req.body.videolink,
        courseImage: req.body.courseImage,
        coursePrice: req.body.coursePrice,
        courseTutor: req.body.courseTutor,
        tutorrating: req.body.tutorrating,
        tutorExperience: req.body.tutorExperience,
      });
      if (course) {
        return res.json(200, {
          message: "succesfully course inseted",
        });
      }
    }
    return res.json(401, {
      message: "couseName  already exists",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};

module.exports.courseinfo = async function (req, res) {
  try {
    let course = await Course.findOne({ courseName: req.body.courseName });
    if (course) {
      return res.json(200, {
        message: "course found succesfully",
        course: course,
      });
    }
    return res.json(401, {
      message: "course not exists",
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
    let course = await Course.updateOne(
      { courseName: req.body.courseName },
      {
        $set: {
          courseName: req.body.courseName,
          coursedescriptions: req.body.coursedescriptions,
          videolink: req.body.videolink,
          courseImage: req.body.courseImage,
          coursePrice: req.body.coursePrice,
          courseTutor: req.body.courseTutor,
          tutorrating: req.body.tutorrating,
          tutorExperience: req.body.tutorExperience,
        },
      }
    );
    if (course) {
      return res.json(200, {
        message: "succesfully updated",
      });
    }
    return res.json(401, {
      message: "not found course",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};
