import { TProduct } from "../products/product.interface";
import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
    const productData = await Product.findById(orderData.productId);
    // console.log(productData.inventory.quantity);
    if (productData !== null && productData.inventory.quantity > 0) {
        if (orderData.quantity > productData.inventory.quantity) {
            throw new Error("Insufficient quantity available in inventory")
        }
        const result = await Order.create(orderData);
        // const productId = result.productId;

        const newQuantity = productData.inventory.quantity - orderData.quantity;
        // console.log(newQuantity);
        await Product.updateOne({ _id: result.productId }, { "inventory.quantity": newQuantity })
        return result;
    }




}

export const orderServices = {
    createOrderIntoDB
}