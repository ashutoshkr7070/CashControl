const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();
const connectDb = require('./config/connectDb');
// const path = require('path');

// database call
connectDb();

const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

// app.use(cors({
//     origin: 'https://cash-control-frontend.vercel.app', // Replace with your actual frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));




// using routes
app.use('/api/v1/users', require('./routes/userRoute'))
app.use('/api/v1/transections', require('./routes/transectionRoutes'))


// static files
// app.use(express.static(path.join(__dirname, './client/build')))
// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// })

// port
const PORT = process.env.PORT || 8000;

// Listen server
app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`)
})