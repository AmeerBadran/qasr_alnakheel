const express = require('express');
const { roomRating, getCustomerById, poolRating, hallRating } = require('./Customer.Controller');
const router= express.Router();

router.post("/roomRating",roomRating)
router.post("/poolRating", poolRating)
router.post("/hallRating", hallRating)

router.get("/:id", getCustomerById)