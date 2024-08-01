"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedOrderSchema = void 0;
const zod_1 = require("zod");
exports.validatedOrderSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1),
    productId: zod_1.z.string().min(1),
    price: zod_1.z.number().min(0),
    quantity: zod_1.z.number().min(1)
});
