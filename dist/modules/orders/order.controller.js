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
exports.orderControllers = void 0;
const order_validation_zod_1 = require("./order.validation.zod");
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const validatedOrderedData = order_validation_zod_1.validatedOrderSchema.parse(orderData);
        const result = yield order_services_1.orderServices.createOrderIntoDB(validatedOrderedData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong"
        });
    }
});
const getAllOrdersOrGetByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const givenEmail = req.query.email;
        const isEmpty = (obj) => Object.keys(obj).length === 0;
        let result;
        if (isEmpty(req.query)) {
            result = yield order_services_1.orderServices.getAllOrdersFromDB();
        }
        else {
            if (givenEmail === '') {
                throw new Error("Order not found");
            }
            else {
                result = yield order_services_1.orderServices.getOrdersByEmailFromDB(givenEmail);
            }
        }
        res.status(200).json({
            success: true,
            message: `${givenEmail ? "Orders fetched successfully for user email!" : "Orders fetched successfully!"}`,
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong"
        });
    }
});
exports.orderControllers = {
    createOrder,
    getAllOrdersOrGetByEmail
};
