const { Router } = require("express");
var router = Router();
const productsController = require("../controllers/products");
const { JWTAuth } = require("../helpers/passport");
const { permit } = require("../helpers/role");
const { ERole } = require("../configs/constants");


/* GET users listing. */
router.get("/", productsController.get);
router.get("/:id", productsController.getById);
router.get("/code/:code", productsController.getByCode);
router.post("/", JWTAuth, permit(ERole.ADMIN), productsController.create);
router.put("/:id", JWTAuth, permit(ERole.ADMIN), productsController.updateById);
router.delete("/:id", JWTAuth, permit(ERole.ADMIN), productsController.deleteById);

module.exports = router;
