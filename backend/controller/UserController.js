const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
// imported db for product
const  User  = require("../models/user");
const createToken = require("../utils/createToken")
const handleErrors = require("../utils/handleErrors");
const sendToken = require("../utils/createToken");

const postuser = async(req,res,next)=>{
try{
    console.log(req.body)
    const {username,email, password} = req.body
    console.log(req.body)
    const user = await User.create({
        username, email,password
    })
     sendToken(user, 200, res)
    // res.json({message:'user Created', user, token})
    }catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
      next();
    }

}

const login = async (req, res) => {
   console.log(req.body)
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({ message : "please enter email and password" });
    }
    try {
      const user = await User.findOne({ email }).select('+password');
      console.log(user)
      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
        //   return user;
         sendToken(user, 200, res)
        // res.cookie('token', token, { httpOnly: true, maxAge: process.env.expiry*60*24  *1000 });
        //  return res.status(200).json({message: 'Successful Login' , user});
        
        }
        return res.status(400).json({message: 'Incorrect Password'});
      }
      return res.status(400).json({message: 'incorrect email'});
    } 
     catch (error) {
      // const errors = handleErrors(error);
         console.log(error)
      //  res.status(400).json({ errors });
     }
  }



 // Get currently logged in user details   =>   /api/v1/me
const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
      success: true,
      user
  })
}

// to update password
const updatepassword = async (req, res, next) => {
  try{
  const user = await User.findById(req.user._id).select('+password');

  // Check previous user password
  const isMatched = await bcrypt.compare(req.body.oldPassword, user.password)
  if (!isMatched) {
      return res.json ({message : 'Old password is incorrect'});
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res)
  }
  catch(error){
    console.log(error)
  }
}


// to logout
const logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

// // Forgot Password   =>  /api/v1/password/forgot
// const forgotPassword = async (req, res, next) => {

//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//         return res.json({message:'User not found with this email'});
//     }

//     // Get reset token
//     const resetToken = user.getResetPasswordToken();

//     await user.save({ validateBeforeSave: false });

//     // Create reset password url
//     const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

//     const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

//     try {

//         await sendEmail({
//             email: user.email,
//             subject: 'ShopIT Password Recovery',
//             message
//         })

//         res.status(200).json({
//             success: true,
//             message: `Email sent to: ${user.email}`
//         })

//     } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save({ validateBeforeSave: false });

//         return next(new ErrorHandler(error.message, 500))
//     }

// }
// // Reset Password   =>  /api/v1/password/reset/:token
// const resetPassword = async (req, res, next) => {

//     // Hash URL token
//     const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

//     const user = await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() }
//     })

//     if (!user) {
//         return res.status(400).json({message:'Password reset token is invalid or has been expired'})
//     }

//     if (req.body.password !== req.body.confirmPassword) {
//         return res.status(400).json({message: 'Password does not match'})
//     }

//     // Setup new password
//     user.password = req.body.password;

//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     sendToken(user, 200, res)

// }

// by admin of him own
const updateprofile =  async (req, res) => {
  const values = req.body
  try {
   const user = await User.findByIdAndUpdate(req.user._id, values)
    res.status(200).json({message: "details changed", user,values});
  } catch (error) {
    console.log(error);
  }
};
// get all users by admin
const allUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
      success: true,
      count : users.length,
      users,

  })
}

// get one users by admin 
const oneUsers = async (req, res, next) => {
  console.log(req.params.id)
  const user = await User.findById(req.params.id);

  res.status(200).json({
      success: true,
      user,

  })
}

// get one user and update his role
const updateUserRole = async (req, res, next) => {
  try{
  console.log(req.params.id)
  console.log(req.body)
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
      success: true,
      user,
  })
}catch(error){
  console.log(error)
}
}

// to delete user 
const deleteuser = async (req, res, next) => {
  console.log(req.params.id)
  const user = await User.findById(req.params.id);
  if(user){
  await user.remove()
  res.status(200).json({
      success: true,
     message: "User Deleted"
  
  })
}else
{
  res.status(404).json({
    success: false,
   message: "User not found entered Id"

})
}
}
module.exports = {
postuser,
login,
logout,
getUserProfile
,
updatepassword,
updateprofile,
allUsers,
oneUsers,
updateUserRole,
deleteuser
// resetPassword,
// forgotPassword
}