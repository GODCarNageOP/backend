const express = require('express');
const router = express.Router();
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

const {
  createSamajikSevayein,
  getAllSamajikSevayein,
  getSamajikSevayeinById,
  updateSamajikSevayeinById,
  deleteSamajikSevayeinById,
} = require('../controllers/SamajhKiSevayeController');

// Routes for SamajikSeva
router.route('/samajiksevayen').post(isAuthenticatedUser,createSamajikSevayein);
router.get('/samajiksevayen', getAllSamajikSevayein);
router.get('/samajiksevayen/:id', getSamajikSevayeinById);
router.route('/samajiksevayen/:id').put(isAuthenticatedUser,updateSamajikSevayeinById);
router.route('/samajiksevayen/:id').delete(isAuthenticatedUser,deleteSamajikSevayeinById);

module.exports = router;
