import { TProduct } from "./products.interface";
import { Product } from "./products.model";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
}

const getAllProductsFromDB = async () => {
    const result = await Product.find();
    return result;
}

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findOne({ _id: id });
    return result;
}

export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB
}