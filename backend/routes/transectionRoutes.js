const express = require('express');


const { addTransection, getAllTransection, editTransection, deleteTransection } = require('../controllers/transectionController');

// router object
const router = express.Router()


// routes

// add transection Post method
router.post('/add-transection', addTransection)

// get all transecctions
router.post('/get-transection', getAllTransection);

// edit transection Post method
router.post('/edit-transection', editTransection)

// delete transection Post method
router.post("/delete-transection", deleteTransection);









module.exports = router;