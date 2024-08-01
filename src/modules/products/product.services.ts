import { TProduct } from "./product.interface";
import { Product } from "./product.model";

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

const updateProductIntoDB = async (id: string, updatedProductData: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
    return result;
}

const deleteProductFromDB = async (id: string) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
}

const searchProductFromDB = async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, "i");
    const result = await Product.find({
        $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { tags: { $in: [regex] } },
            { "variants.type": regex },
            { "variants.value": regex }
        ]
    });
    return result
}

export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    searchProductFromDB
}