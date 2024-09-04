const mongoose = require('mongoose')
require('dotenv').config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb; 