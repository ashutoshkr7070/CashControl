const userModel = require('../models/userModel')

// login callback
const loginController = async(req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userModel.findOne({email, password})
    if(!user) {
      return res.status(404).send('Invalid Credentials');
    }

    res.status(200).json({success: true, user});
  } catch (error) {
    res.status(400).json({success: false, error})
  }
}

// register Callback
const registerController = async(req, res) => {
  try {
    const newUser = new userModel(req.body);
    const response = await newUser.save();
    res.status(201).json({
      success: true,
      response
    })
  } catch (error) {
    res.status(400).json({success: false, error})
  }
}

module.exports = {loginController, registerController}