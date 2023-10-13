const express = require("express");
const {
  createNews,
  getAllNewss,
  getNewsById,
  updateNewsById,
  deleteNewsById,
} = require("../controllers/NewsController");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/news/new").post(isAuthenticatedUser,authorizeRoles('admin'),createNews);
router.route("/news/all").get(getAllNewss);
router.route("/news/:id").get(getNewsById);
router.route("/news/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateNewsById);
router.route("/news/:id").delete(isAuthenticatedUser,authorizeRoles("admin"), deleteNewsById);

module.exports = router;
