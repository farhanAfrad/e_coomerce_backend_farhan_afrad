"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.productSchema = exports.inventorySchema = exports.varientSchema = void 0;
const mongoose_1 = require("mongoose");
exports.varientSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
});
exports.inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});
exports.productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, rquired: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: [exports.varientSchema],
    inventory: [exports.inventorySchema]
});
exports.Product = (0, mongoose_1.model)('product', exports.productSchema);
