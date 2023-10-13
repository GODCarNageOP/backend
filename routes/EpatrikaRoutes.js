const express = require('express');
const router = express.Router();
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

const {
    createEpatrika,
    getAllEpatrikas,
    getEpatrikaById,
    updateEpatrikaById,
    deleteEpatrikaById,
} = require('../controllers/EpatrikaController');

// Routes for SamajikSeva
router.route('/epatrika').post(authorizeRoles,isAuthenticatedUser,createEpatrika);
router.get('/epatrika', getAllEpatrikas);
router.get('/epatrika/:id', getEpatrikaById);
router.route('/epatrika/:id').put(authorizeRoles,isAuthenticatedUser,updateEpatrikaById);
router.route('/epatrika/:id').delete(authorizeRoles,isAuthenticatedUser,deleteEpatrikaById);

module.exports = router;
