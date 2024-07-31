import { TProduct } from "./products.interface";
import { Product } from "./products.model";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
}


export const productServices = {
    createProductIntoDB
}