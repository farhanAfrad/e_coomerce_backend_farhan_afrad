import { model, Schema } from "mongoose";
import { TInventory, TProduct, TVariants } from "./product.interface";

export const varientSchema = new Schema<TVariants>({
    type: { type: String, required: true },
    value: { type: String, required: true },
})

export const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
})

export const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String, rquired: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: [varientSchema],
    inventory: inventorySchema
})

export const Product = model<TProduct>('product', productSchema);