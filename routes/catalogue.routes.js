const router = require("express").Router();

const {
  createCatalogue,
  updateCatalogue,
  getAllCatalogues,
  deleteCatalogue,
} = require("../controllers/catalogue.controller");

const { verifyToken, checkRole } = require("../middleware");

router.post("/create", verifyToken, checkRole(["Admin"]), createCatalogue);
router.patch("/:id/update", verifyToken, checkRole(["Admin"]), updateCatalogue);
router.get("/all", getAllCatalogues);
router.delete(
  "/:id/delete",
  verifyToken,
  checkRole(["Admin"]),
  deleteCatalogue
);

module.exports = router;
