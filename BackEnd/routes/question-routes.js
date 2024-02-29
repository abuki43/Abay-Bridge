const express = require("express");
const router = express.Router();

const {} = require("../controllers/question-controller");

const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);

router.post("/:UID", newQuestion);

router.patch("/:QID", editQuestion);

router.delete("/:QID", deleteQuestion);

module.exports = router;
