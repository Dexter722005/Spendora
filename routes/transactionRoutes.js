const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/transactionController");

router.post("/", auth, ctrl.createTransaction);
router.get("/", auth, ctrl.getTransactions);
router.put("/:id", auth, ctrl.updateTransaction);
router.delete("/:id", auth, ctrl.deleteTransaction);

module.exports = router;