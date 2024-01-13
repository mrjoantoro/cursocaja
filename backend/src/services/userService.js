const User = require("../api/models/User");
const { getUserModel } = require("../lib/admindb");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const logger = require("../lib/logger");


exports.findOrCreate = async(data) => {
  try {
    const { email, password, rol, tenant } = data;
    const userModel = await getUserModel(tenant);
    const hashedPassword = await bcrypt.hash(password, 10);
    let doc = await userModel.findOneAndUpdate({ email: email }, { email: email, password: hashedPassword, rol: rol });
    if(!doc) {
      const user = new userModel({ email: email, password: hashedPassword, rol: rol });
      await user.save();
      return user;
    }
  } catch (error) {
    logger.error("Error creating user:", error);
    throw error;
  }
}