import { z } from "zod";

export const varientSchemaValidation = z.object({
    type: z.string().min(1),
    value: z.string().min(1),
})

export const inventorySchemaValidation = z.object({
    quantity: z.number().min(1),
    inStock: z.boolean().default(true),
})

export const productSchemaValidation = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(1),
    category: z.string().min(1),
    tags: z.string().array(),
    variants: z.array(varientSchemaValidation),
    inventory: inventorySchemaValidation
})