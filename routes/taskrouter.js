const express = require('express')
const { newtask, getmytask, deletetask, updatetask } = require("../controller/taskcontrollers.js");
const { isauthenticated , } = require('../middleware/auth.js');


const router= express.Router();

router.post('/task/new',isauthenticated, newtask)
router.get('/task/my', isauthenticated, getmytask)
router.delete('/task/:id', isauthenticated, deletetask)
router.put('/task/:id', isauthenticated, updatetask)

module.exports = router;