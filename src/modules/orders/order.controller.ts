import { Request, Response } from "express";
import { validatedOrderSchema } from "./order.validation.zod";
import { orderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const validatedOrderedData = validatedOrderSchema.parse(orderData);
        const result = await orderServices.createOrderIntoDB(validatedOrderedData);

        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong"
        })
    }
}

const getAllOrdersOrGetByEmail = async (req: Request, res: Response) => {
    try {
        const givenEmail = req.query.email as string;
        let result;
        if (givenEmail) {
            result = await orderServices.getOrdersByEmailFromDB(givenEmail);
        }
        result = await orderServices.getAllOrdersFromDB();
        res.status(200).json({
            success: true,
            message: `${givenEmail ? "Orders fetched successfully for user email!" : "Orders fetched successfully!"}`,
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong"
        })
    }
}


export const orderControllers = {
    createOrder,
    getAllOrdersOrGetByEmail
} 