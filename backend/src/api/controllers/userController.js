const userService = require("../../services/userService");

exports.create = async (req, res) => {
  try {
    const user = await userService.findOrCreate(req.body);
    res.status(201).json({ message: "User created successfully", data: user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

