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
exports.orderServices = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = yield product_model_1.Product.findById(orderData.productId);
    // console.log(productData.inventory.quantity);
    if (productData !== null && productData.inventory.quantity > 0) {
        if (orderData.quantity > productData.inventory.quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        const result = yield order_model_1.Order.create(orderData);
        // const productId = result.productId;
        const newQuantity = productData.inventory.quantity - orderData.quantity;
        // console.log(newQuantity);
        yield product_model_1.Product.updateOne({ _id: result.productId }, { "inventory.quantity": newQuantity });
        return result;
    }
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    if (result.length === 0) {
        throw new Error("Order not found");
    }
    return result;
});
const getOrdersByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ email: email });
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getOrdersByEmailFromDB
};
