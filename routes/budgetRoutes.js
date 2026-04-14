const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/budgetController");

router.post("/", auth, ctrl.setBudget);
router.get("/", auth, ctrl.getBudgets);

module.exports = router;