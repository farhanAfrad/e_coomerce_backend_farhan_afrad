import { z } from 'zod';

export const validatedOrderSchema = z.object({
    email: z.string().email().min(1),
    productId: z.string().min(1),
    price: z.number().min(0),
    quantity: z.number().min(1)
})