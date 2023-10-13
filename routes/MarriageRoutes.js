const express = require("express");
const router = express.Router();
const {
  createMarriageProfile,
  getAllMarriageProfiles,
  getMarriageProfileById,
  updateMarriageProfileById,
  deleteMarriageProfileById,
} = require("../controllers/MarriageController");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

// @desc    Create a new MarriageProfile
// @route   POST /api/marriage-profiles
// @access  Public
router.post("/marriage/new", isAuthenticatedUser, createMarriageProfile);

// @desc    Get all MarriageProfiles
// @route   GET /api/marriage-profiles
// @access  Public
router.get("/marriage/all", getAllMarriageProfiles);

// @desc    Get a single MarriageProfile by ID
// @route   GET /api/marriage-profiles/:id
// @access  Public
router.get("/marriage/:id", getMarriageProfileById);

// @desc    Update a MarriageProfile by ID
// @route   PUT /api/marriage-profiles/:id
// @access  Public
router.put("/marriage/:id",isAuthenticatedUser, updateMarriageProfileById);

// @desc    Delete a MarriageProfile by ID
// @route   DELETE /api/marriage-profiles/:id
// @access  Public
router.delete("/marriage/:id",isAuthenticatedUser, deleteMarriageProfileById);

module.exports = router;
