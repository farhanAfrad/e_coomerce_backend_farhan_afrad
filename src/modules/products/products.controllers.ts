import { Request, Response } from "express";
import { productSchemaValidation } from "./products.validation.zod";
import { productServices } from "./products.services";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const validatedProductData = productSchemaValidation.parse(productData);
        const result = await productServices.createProductIntoDB(validatedProductData);

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        })
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await productServices.getAllProductsFromDB();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        })
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productID;
        const result = await productServices.getSingleProductFromDB(productId);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        })
    }
}


export const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct
}