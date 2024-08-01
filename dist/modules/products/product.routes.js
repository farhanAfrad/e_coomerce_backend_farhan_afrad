"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controllers_1 = require("./product.controllers");
const router = express_1.default.Router();
router.post('/', product_controllers_1.productController.createProduct);
router.get('/', product_controllers_1.productController.getAllOrSearchedProducts);
router.get('/:productID', product_controllers_1.productController.getSingleProduct);
router.put('/:productID', product_controllers_1.productController.updateSingleProduct);
router.delete('/:productID', product_controllers_1.productController.deleteSingleProduct);
exports.productRoutes = router;
