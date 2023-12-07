const express=require('express');
const { register, login, getprofile, logout } = require('../controller/usercontroller.js');
const { isauthenticated } = require('../middleware/auth.js');
// const { userget, usercreate, userdelete, userupdate, userone } = require('../controller/usercontroller')

const router=express.Router();

// router.route("/users").get(userget)
router.route("/users/new").post(register)
router.route("/users/login").post (login)
router.route("/users/me").get( isauthenticated,getprofile)
router.route("/users/logout").get(logout)
// router.route("/users/:id").put(userupdate)
// router.route("/users/:id").delete(userdelete).get(userone),


module.exports = router;
