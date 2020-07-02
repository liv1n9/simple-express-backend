const { Router } = require("express");
var router = Router();
const billsController = require("../controllers/bills");
const { JWTAuth } = require("../helpers/passport");
const { permit } = require("../helpers/role");
const { ERole } = require("../configs/constants");

/* GET users listing. */
router.get("/", JWTAuth, permit(ERole.ADMIN), billsController.get);
router.get("/user", JWTAuth, permit(ERole.USER), billsController.userGet);
router.get("/:id", JWTAuth, billsController.getById);
router.post("/user", JWTAuth, permit(ERole.USER), billsController.userCreate);
router.put(
  "/user/:id",
  JWTAuth,
  permit(ERole.USER),
  billsController.userUpdateById
);
router.put(
  "/admin/check/:id",
  JWTAuth,
  permit(ERole.ADMIN),
  billsController.adminCheckById
);
router.put(
  "/admin/uncheck/:id",
  JWTAuth,
  permit(ERole.ADMIN),
  billsController.adminUncheckById
);
router.delete("/:id", JWTAuth, permit(ERole.ADMIN), billsController.deleteById);

module.exports = router;
