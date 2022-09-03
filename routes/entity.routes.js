const router = require("express").Router();

const {
  createEntity,
  updateEntity,
  getAllEntities
} = require("../controllers/entity.controller");

const { verifyToken, checkRole } = require("../middleware");

router.post("/create", verifyToken, checkRole(["Admin"]), createEntity);
router.patch("/:id/update", verifyToken, checkRole(["Admin"]), updateEntity);
router.get("/all", getAllEntities);


module.exports = router;
