const express = require('express');

const router = express.Router();

const multer = require("multer");
const { addRoom, deleteRoom, getAllRooms, getRoomById, updateRoom, addRoomImage, deleteRoomImage, updateMainImage, updateRoomPricing, createSpecialPricing, updateSpecialPricing, getSpecialPrice, addRoomType, getRoomTypes, deleteRoomType, updateRoomType } = require('./Room.Controller');
const { uploadRoomImages, uploadSingleRoomImage } = require('../../config/multerConfig');
const { verifyTokenAdmin } = require('../../middleware/verifyToken');
const upload = multer();


router.post('/', verifyTokenAdmin, uploadRoomImages, addRoom);
router.post('/addRoomImage/:id', verifyTokenAdmin, uploadSingleRoomImage, addRoomImage)
router.post('/addSpecialPrice', verifyTokenAdmin, createSpecialPricing)

//Room Type
router.post('/addRoomType', verifyTokenAdmin, addRoomType)
router.get('/roomTypes', getRoomTypes)
//

router.get('/', getAllRooms)
router.get('/:id', getRoomById);
router.get('/get/allSpecialPrice', getSpecialPrice)

router.put('/:id', upload.none(), verifyTokenAdmin, updateRoom);
router.patch('/changeMainImage/:id', verifyTokenAdmin, uploadSingleRoomImage, updateMainImage)
router.patch('/changePricing/:id', verifyTokenAdmin, updateRoomPricing)
router.put('/changeSpecialPrice/:id', verifyTokenAdmin, updateSpecialPricing)

//Room Type
router.put('/roomTypeUpdate/:id', verifyTokenAdmin, updateRoomType)
router.delete('/roomTypeDelete/:id', verifyTokenAdmin, deleteRoomType)
//

router.delete('/:id', verifyTokenAdmin, deleteRoom)
router.delete('/roomImage/:id', verifyTokenAdmin, deleteRoomImage)

module.exports = router;

