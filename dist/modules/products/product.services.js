"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id });
    return result;
});
const updateProductIntoDB = (id, updatedProductData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, updatedProductData, { new: true });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
const searchProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, "i");
    const result = yield product_model_1.Product.find({
        $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { tags: { $in: [regex] } },
            { "variants.type": regex },
            { "variants.value": regex }
        ]
    });
    return result;
});
exports.productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    searchProductFromDB
};
