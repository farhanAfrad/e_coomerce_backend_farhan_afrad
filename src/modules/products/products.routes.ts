import express from 'express';
import { productController } from './products.controllers';
const router = express.Router();


router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productID', productController.getSingleProduct);

export const productRoutes = router;