const User = require("../api/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const logger = require("../lib/logger");

/**
 * The function `createUser` is an asynchronous function that creates a new user if the user does not
 * already exist.
 * @param userData - The `userData` parameter is an object that contains the information needed to
 * create a new user. It typically includes properties such as `email`, `username`, `password`, and any
 * other relevant user details.
 * @returns the created user object if the user does not already exist. If the user already exists, it
 * throws an error with the message "User already exists".
 */
const createUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    logger.error("Error creating user:", error);
    throw error;
  }
};

/**
 * The `authenticateUser` function takes an email and password as parameters, finds the user with the
 * given email, checks if the password is correct, and returns the user and a token if authentication
 * is successful.
 * @param email - The email parameter is the email address of the user trying to authenticate.
 * @param password - The password parameter is the password entered by the user during the
 * authentication process.
 * @returns The function `authenticateUser` returns an object with two properties: `user` and `token`.
 * The `user` property contains the user object retrieved from the database, and the `token` property
 * contains a JSON Web Token (JWT) generated using the user's ID, role, and a secret key.
 */
const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiration,
      }
    );

    return { user, token };
  } catch (error) {
    logger.error("Error authenticating user:", error);
    throw error;
  }
};

/**
 * The function `updateUser` updates a user's data in a database and returns the updated user.
 * @param id - The id parameter is the unique identifier of the user that needs to be updated. It is
 * used to find the user in the database and update their information.
 * @param updatedData - The `updatedData` parameter is an object that contains the updated information
 * for the user. It can include properties such as `name`, `email`, `password`, or any other fields
 * that need to be updated for the user.
 * @returns The function `updateUser` returns the updated user object.
 */
const updateUser = async (id, updatedData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error("Error updating user:", error);
    throw error;
  }
};

/**
 * The deleteUser function deletes a user with the specified id and returns the deleted user, or throws
 * an error if the user is not found.
 * @param id - The `id` parameter is the unique identifier of the user that needs to be deleted.
 * @returns the deleted user object if the deletion is successful.
 */
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error("Error deleting user:", error);
    throw error;
  }
};

/**
 * The function `listUsers` retrieves a list of users from a database and returns it, while handling
 * any errors that occur.
 * @returns The function `listUsers` is returning a promise that resolves to an array of user objects.
 */
const listUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    logger.error("Error listing users:", error);
    throw error;
  }
};

/**
 * The function `getUser` is an asynchronous function that retrieves a user by their ID and throws an
 * error if the user is not found.
 * @param id - The `id` parameter is the unique identifier of the user that we want to retrieve from
 * the database.
 * @returns The function `getUser` returns a promise that resolves to the user object if found, or
 * throws an error if the user is not found.
 */
const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error("Error getting user:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  authenticateUser,
  updateUser,
  deleteUser,
  listUsers,
  getUser,
};
