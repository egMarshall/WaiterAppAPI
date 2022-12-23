import path from 'path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { updateProductByID } from './app/useCases/products/updateProductByID';
import { deleteProductByID } from './app/useCases/products/deleteProductByID';
import { changeOrderStatusByID } from './app/useCases/orders/changeOrderStatusByID';
import { deleteOrderByID } from './app/useCases/orders/deleteOrderByID';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List Categories
router.get('/categories', listCategories);

// Create Category
router.post('/categories', createCategory);

// List Products
router.get('/products', listProducts);

// Create Product
router.post('/products',upload.single('image'), createProduct);

// Update Product By ID
router.put('/products/:product_id', upload.single('image'),
  updateProductByID);

// Delete Product By ID
router.delete('/products/:product_id', deleteProductByID);

// Get Products by Category
router.get('/categories/:category_id/products', listProductsByCategory);

// List Orders
router.get('/orders', listOrders);

// Create Order
router.post('/orders', createOrder);

// Change Order Status
router.patch('/orders/:order_id', changeOrderStatusByID);

// Delete/Cancel Order
router.delete('/orders/:order_id',deleteOrderByID);
