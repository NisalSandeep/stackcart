import { Router } from "express";

import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

 // GET /api/products/ - Get all products (public route)
 router.get("/", productController.getAllProducts);

// GET /api/products/my - Get products of the current user (protected route)
 router.get("/my", requireAuth(), productController.getMyProducts)

 // GET /api/products/:id - Get product by ID (public route)
 router.get("/:id", productController.getProductById);

 // POST /api/products/ - Create a new product (protected route)
 router.post("/", requireAuth(), productController.createProduct)

 // PUT /api/products/:id - Update a product (protected route)
 router.put("/:id", requireAuth(), productController.updateProduct)

 // DELETE /api/products/:id - Delete a product (protected route)
 router.delete("/:id", requireAuth(), productController.deleteProduct)

export default router;