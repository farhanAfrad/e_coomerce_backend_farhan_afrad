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
exports.productController = void 0;
const product_validation_zod_1 = require("./product.validation.zod");
const product_services_1 = require("./product.services");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const validatedProductData = product_validation_zod_1.productSchemaValidation.parse(productData);
        const result = yield product_services_1.productServices.createProductIntoDB(validatedProductData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        });
    }
});
const getAllOrSearchedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // as we are same route for getting data based on search or just to find all data 1st we are trying to retrive the searched value from url
        const searchTerm = req.query.searchTerm;
        let result;
        // if serached value is there then it will prove the searchProductFromDB function with the searched value if just trying to get all the data then getAllProductsFromDB function is called
        if (searchTerm) {
            result = yield product_services_1.productServices.searchProductFromDB(searchTerm);
        }
        else {
            result = yield product_services_1.productServices.getAllProductsFromDB();
        }
        res.status(200).json({
            success: true,
            message: `${searchTerm ? `Products matching search term '${searchTerm}' fetched successfully!` : "Products fetched successfully!"}`,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productID;
        const result = yield product_services_1.productServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productID;
        const updatedProductData = req.body;
        const result = yield product_services_1.productServices.updateProductIntoDB(productId, updatedProductData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productID;
        const result = yield product_services_1.productServices.deleteProductFromDB(productId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            err: err
        });
    }
});
exports.productController = {
    createProduct,
    getAllOrSearchedProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
