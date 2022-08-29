const router = require("express").Router();
const authRoutes = require("./auth.routes");
const uploadRoutes = require("./upload.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
