const express = require('express');
const { roomRating, getCustomerById, poolRating, hallRating, deleteCustomer, getAllCustomers } = require('./Customer.Controller');
const router = express.Router();

router.post("/roomRating", roomRating)
router.post("/poolRating", poolRating)
router.post("/hallRating", hallRating)

router.get("/:id", getCustomerById)
router.get("/", getAllCustomers)

router.delete('/:id', deleteCustomer)

module.exports = router;