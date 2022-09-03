const router = require("express").Router();

const {
  createQuote,
  updateQuote,
  updateStatusQuote,
  getQuoteById,
  getAllQuotes,
  deleteQuote,
} = require("../controllers/quote.controller");

const { verifyToken, checkRole } = require("../middleware");

router.post("/create", createQuote);
router.patch("/:id/update", updateQuote);
router.patch(
  "/:id/updateStatus",
  verifyToken,
  checkRole(["Admin"]),
  updateStatusQuote
);
router.get("/all", getAllQuotes);
router.get("/:id/detail", getQuoteById);
router.delete("/:id/delete", verifyToken, checkRole(["Admin"]), deleteQuote);

module.exports = router;
