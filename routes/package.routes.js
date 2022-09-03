const router = require("express").Router();

const {
  createPackage,
  updatePackage,
  getAllPackages,
} = require("../controllers/package.controller");

const { verifyToken, checkRole } = require("../middleware");

router.post("/create", verifyToken, checkRole(["Admin"]), createPackage);
router.patch("/:id/update", verifyToken, checkRole(["Admin"]), updatePackage);
router.get("/all", getAllPackages);

module.exports = router;
