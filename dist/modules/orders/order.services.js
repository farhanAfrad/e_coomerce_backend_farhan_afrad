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
    // 1stly productId from order data is retrieved
    const productData = yield product_model_1.Product.findById(orderData.productId);
    // as ordered product could not be in the database hence the value can be null that's why it is added in the condition then also checked product quantity is available
    if (productData !== null && productData.inventory.quantity > 0) {
        // if ordered quantity is larger than the available product quantity than an message will send to the customer
        if (orderData.quantity > productData.inventory.quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        const result = yield order_model_1.Order.create(orderData);
        // here calculation is done after order how much quantiy is available
        const newQuantity = productData.inventory.quantity - orderData.quantity;
        // console.log(newQuantity);
        const modifiedProduct = yield product_model_1.Product.findByIdAndUpdate({ _id: result.productId }, { "inventory.quantity": newQuantity }, { new: true });
        // when product quantity reaches 0 inStock will change to false
        if ((modifiedProduct === null || modifiedProduct === void 0 ? void 0 : modifiedProduct.inventory.quantity) === 0) {
            yield product_model_1.Product.findByIdAndUpdate({ _id: result.productId }, { "inventory.inStock": false }, { new: true });
        }
        return result;
    }
    else {
        throw new Error("Insufficient quantity available in inventory");
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
    if (result.length === 0) {
        throw new Error("Order not found");
    }
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getOrdersByEmailFromDB
};
