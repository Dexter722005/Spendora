const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getInsights } = require("../controllers/insightController");

router.get("/", auth, getInsights);

module.exports = router;