const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')
router.get('/who', (req,res)=>{
    res.json({ message: "HELLO FROM Who" });
})

// to register user
router.post('/signupuser', UserController.postuser)

// to login 
router.post('/login', UserController.login)

// to logout
router.get('/logout', UserController.logout)

// router.post('/password/forgot', UserController.forgotPassword)
// router.put('/password/reset/:token', UserController.resetPassword)

// to get details of currently logged in user
router.get('/getuserprofile',isAuthenticatedUser, UserController.getUserProfile)

// to update password for logged in user
router.post('/updatepassword',isAuthenticatedUser, UserController.updatepassword)
// to update user details
router.post('/updateprofile',isAuthenticatedUser, UserController.updateprofile)

// to get all users
router.get('/getallusers',isAuthenticatedUser, authorizeRoles('admin'),UserController.allUsers)

// to get single user 
router.get('/getoneuser/:id',isAuthenticatedUser, authorizeRoles('admin'),UserController.oneUsers)

// to update user role
router.get('/updateuserrole/:id',isAuthenticatedUser, authorizeRoles('admin'),UserController.updateUserRole)

// to delete user
router.get('/deleteuser/:id',isAuthenticatedUser, authorizeRoles('admin','user'),UserController.deleteuser)


module.exports = router;