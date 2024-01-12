const mongoose = require("mongoose");

const parentCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      attorney: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attorney",
      },
      position: {
        type: String,
        required: true,
      },
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  proxies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attorney",
    },
  ],
});

const ParentCenter = mongoose.model("ParentCenter", parentCenterSchema);

module.exports = ParentCenter;
