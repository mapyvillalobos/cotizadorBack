const router = require("express").Router();

const {
  getLoggedUser,
  editProfile,
  getUserById,
  onlyAdminRead,
} = require("../controllers/user.controller");
const { verifyToken, checkRole } = require("../middleware");

router.get("/my-profile", verifyToken, getLoggedUser);
router.patch("/edit-profile", verifyToken, editProfile);
router.get("/:id/profile", verifyToken, getUserById);
router.get("/admin/users", verifyToken, 
// checkRole(["Admin"]), 
onlyAdminRead
);

module.exports = router;
