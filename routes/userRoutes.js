const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/requestLoan', UserController.requestLoan);
router.post('/confirmPayment', UserController.confirmPayment);
router.get('/dashboard/:userId', UserController.getUserDashboard);
router.get('/adminDashboard', UserController.getAdminDashboard);

module.exports = router;
