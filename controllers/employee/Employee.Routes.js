const express = require('express');

const router = express.Router();

const multer = require("multer");
const { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, changeEmployeeShift, changeEmployeeJop, changeEmployeeStatus, changePassword, getEmployeeFilter, get } = require('./Employee.Controller');
const { logIn } = require('./EmployeeAuth.Controller');
const { verifyTokenAdmin } = require('../../middleware/verifyToken');
const upload = multer();


router.post('/', upload.none(), verifyTokenAdmin, addEmployee);
router.post('/login', logIn)

router.get('/', verifyTokenAdmin, getAllEmployees);
router.get('/getById/:id', getEmployeeById);
router.get('/filters/:page/:limit', getEmployeeFilter)

router.put('/:id', updateEmployee);
router.patch('/shift/:id', verifyTokenAdmin, changeEmployeeShift);
router.patch('status/:id', verifyTokenAdmin, changeEmployeeStatus);
router.patch('/jop/:id', verifyTokenAdmin, changeEmployeeJop);
router.patch('/changePassword/:id', changePassword);

router.delete('/:id', deleteEmployee);

module.exports = router;


