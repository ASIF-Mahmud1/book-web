import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res.status("401").json({
        error: "User not found",
      });

    if (!user.authenticate(req.body.password)) {
      return res.status("401").send({
        error: "Email and password don't match.",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret
    );
    const expiryDate = new Date(Number(new Date()) + 172800000);

    // res.cookie("t", token, {
    //   expire: new Date() + 9999,// this just appending the 9999 with date object
    // });

    res.cookie("token", token, {
      expire: expiryDate,
      httpOnly: true,
    });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({
      error: "Could not sign in",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});

// const hasAuthorization = (req, res, next) => {
//   //const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
//   //console.log(req.profile);
//   //console.log(req.profile._id);
//   //console.log(req.auth);
//   //console.log(req.auth._id);
//   const authorized = "abc";
//   //console.log(authorized);
//   console.log(req.cookies.t);
//   console.log(process.env.JWT_SECRET);
//   if (!authorized) {
//     // how do you know the token is valid
//     return res.status("403").json({
//       error: "User is not authorized",
//     });
//   }
//   next(); // next where
// };

const hasAuthorization = async (req, res, next) => {
  try {
    //const token = req.header("Authorization");
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status("403").json({
        error: "User is not authorized",
      });
    }
    const verified = jwt.verify(token, config.jwtSecret);
    if (!verified) {
      return res.status("403").json({
        error: "Invalid Authorization token",
      });
    }
    const user = await User.findById(verified._id);
    if (!user) {
      return res.status("404").json({
        error: "User not found",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
};
