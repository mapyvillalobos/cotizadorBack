const router = require("express").Router();

const {
  signupProcess,
  loginProcess,
  logoutProcess,
} = require("../controllers/auth.controller");
const { verifyToken, checkRole } = require("../middleware");

router.post("/signup", verifyToken, checkRole(["Admin"]), signupProcess);
router.post("/login", loginProcess);
router.get("/logout", logoutProcess);

module.exports = router;
