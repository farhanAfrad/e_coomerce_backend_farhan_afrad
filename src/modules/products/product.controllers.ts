import { Request, Response } from "express";
import { productSchemaValidation } from "./product.validation.zod";
import { productServices } from "./product.services";

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

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productID;
        const updatedProductData = req.body;
        const result = await productServices.updateProductIntoDB(productId, updatedProductData);

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
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

const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productID;

        const result = await productServices.deleteProductFromDB(productId);

        if (result) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        })
    }
}

const searchProduct = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string;


        const result = await productServices.searchProductFromDB(searchTerm);


        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
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
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    searchProduct
}