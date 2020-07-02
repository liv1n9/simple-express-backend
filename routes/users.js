const { Router } = require("express");
var router = Router();
const usersController = require("../controllers/users");
const { JWTAuth } = require("../helpers/passport");
const { permit } = require("../helpers/role");
const { ERole } = require("../configs/constants");

/* GET users listing. */
router.get("/", usersController.get);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", JWTAuth, permit(ERole.ADMIN), usersController.updateById);
router.delete("/:id", JWTAuth, permit(ERole.ADMIN), usersController.deleteById);

module.exports = router;
