const router = require("express").Router();

const helloController = require("./src/controllers/helloController");
const todosController = require("./src/controllers/todosController");
const authController = require("./src/controllers/authController");

router.use("/", helloController);
router.use("/todos", todosController);
router.use("/auth", authController);
module.exports = router;
