const express = require("express");
const {
  getMarksController,
  addMarksController,
  deleteMarksController,
} = require("../controllers/marks.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/get", auth, getMarksController);
router.post("/", auth, addMarksController);
router.delete("/:id", auth, deleteMarksController);

module.exports = router;
