const mongoose = require("mongoose");
const path = require("path");
const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    coursedescriptions: {
      type: String,
      required: true,
    },
    videolink: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
    coursePrice: {
      type: String,
      required: true,
    },
    courseTutor: {
      type: String,
      required: true,
    },
    tutorrating: {
      type: String,
      required: true,
    },
    tutorExperience: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
