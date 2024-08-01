
import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
    // 1stly productId from order data is retrieved
    const productData = await Product.findById(orderData.productId);
    // as ordered product could not be in the database hence the value can be null that's why it is added in the condition then also checked product quantity is available
    if (productData !== null && productData.inventory.quantity > 0) {

        // if ordered quantity is larger than the available product quantity than an message will send to the customer
        if (orderData.quantity > productData.inventory.quantity) {
            throw new Error("Insufficient quantity available in inventory")
        }
        const result = await Order.create(orderData);

        // here calculation is done after order how much quantiy is available
        const newQuantity = productData.inventory.quantity - orderData.quantity;
        // console.log(newQuantity);
        const modifiedProduct = await Product.findByIdAndUpdate({ _id: result.productId }, { "inventory.quantity": newQuantity }, { new: true })
        // when product quantity reaches 0 inStock will change to false
        if (modifiedProduct?.inventory.quantity === 0) {
            await Product.findByIdAndUpdate({ _id: result.productId }, { "inventory.inStock": false }, { new: true })
        }
        return result;
    }
    else {
        throw new Error("Insufficient quantity available in inventory")
    }
}

const getAllOrdersFromDB = async () => {
    const result = await Order.find();

    if (result.length === 0) {
        throw new Error("Order not found");
    }
    return result;
}

const getOrdersByEmailFromDB = async (email: string) => {
    const result = await Order.find({ email: email });
    return result;
}

export const orderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getOrdersByEmailFromDB
}