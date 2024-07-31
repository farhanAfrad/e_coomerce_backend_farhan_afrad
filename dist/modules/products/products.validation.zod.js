"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemaValidation = exports.inventorySchemaValidation = exports.varientSchemaValidation = void 0;
const zod_1 = require("zod");
exports.varientSchemaValidation = zod_1.z.object({
    type: zod_1.z.string().min(1),
    value: zod_1.z.string().min(1),
});
exports.inventorySchemaValidation = zod_1.z.object({
    quantity: zod_1.z.number().min(1),
    inStock: zod_1.z.boolean().default(true),
});
exports.productSchemaValidation = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().min(1),
    category: zod_1.z.string().min(1),
    tags: zod_1.z.string().array(),
    variants: zod_1.z.array(exports.varientSchemaValidation),
    inventory: exports.inventorySchemaValidation
});
