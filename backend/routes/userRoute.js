const express = require('express');
const { loginController, registerController } = require('../controllers/userController');
const userModel = require('../models/userModel')

// router object
const router = express.Router()


// routes
// Post || login
router.post('/login', loginController)

// Post || register user
router.post('/register', registerController)

// get user data
router.get('/', async(req, res) => {
  try {
    const data = await userModel.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({erron: 'Internal Server Error'});
  }
})









module.exports = router;