const { Router } = require("express");
var router = Router();
const productTypesController = require("../controllers/product-types");
const { JWTAuth } = require("../helpers/passport");
const { permit } = require("../helpers/role");
const { ERole } = require("../configs/constants");


/* GET users listing. */
router.get("/", productTypesController.get);
router.get("/:id", productTypesController.getById);
router.get("/code/:code", productTypesController.getByCode);
router.post("/", JWTAuth, permit(ERole.ADMIN), productTypesController.create);
router.put("/:id", JWTAuth, permit(ERole.ADMIN), productTypesController.updateById);
router.delete("/:id", JWTAuth, permit(ERole.ADMIN), productTypesController.deleteById);

module.exports = router;
