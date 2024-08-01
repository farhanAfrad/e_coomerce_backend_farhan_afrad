import express from 'express';
import { productController } from './product.controllers';
const router = express.Router();


router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProduct);
router.get('/:productID', productController.getSingleProduct);
router.put('/:productID', productController.updateSingleProduct);
router.delete('/:productID', productController.deleteSingleProduct);

export const productRoutes = router;