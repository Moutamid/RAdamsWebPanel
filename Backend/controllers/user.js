const User = require("../models/user");
const crypto = require("crypto");

exports.read = (req, res) => {
  User.findOne({ _id: req.user._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found",
      });
    }
  });
};

exports.getOne = (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    // If user is found, return the user object
    res.json(user);
  });
};

exports.editUser = (req, res) => {
  const { firstName, lastName, vehicle, userName, password, permission } = req.body;

  const updatedUserData = {
    firstName,
    lastName,
    vehicle,
    userName,
    password,
    permission,
  };

  User.findByIdAndUpdate(req.params.id, updatedUserData, { new: true }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found...",
      });
    }
    // If user is found and updated successfully, return the updated user object
    res.json(user);
  });
};

const encryptPassword = async (password, salt) => {
  if (!password) {
    return "";
  }
  try {
    const hashPwd = crypto.createHmac("sha1", salt).update(password).digest("hex");
    console.log("numan 's password", hashPwd);
    return hashPwd;
  } catch (err) {
    return "";
  }
};

exports.update = (req, res) => {
  const { name } = req.body;
  User.findById({ _id: req.user._id }, (err, updated) => {
    if (err) {
      return res.status(400).json({
        error: "Could not find user to update",
      });
    }
    updated.name = name;
    // updated.password = password;
    //updated.hashed_password = encryptPassword(password, updated.salt);
    updated.save((err, resp) => {
      if (err) {
        return res.status(400).json({
          error: "Could not find user to update",
        });
      }
      console.log("Profile updated");
    });
    console.log(updated);
    res.json(updated);
  });
};
//get all users
exports.users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get Drivers

exports.getDriverNames = async (req, res) => {
  try {
    const drivers = await User.aggregate([
      {
        $match: { permission: "Driver" },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
    ]);
    return res.json(drivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error retrieving driver names from the database. Please try again later.",
    });
  }
};
