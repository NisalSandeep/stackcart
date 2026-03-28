import { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get products by current user (protected)
export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const products = await queries.getProductsByUserId(userId);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user's products:", error);
    res.status(500).json({ error: "Failed to get user's products" });
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);

    if (!product) {
      res.status(404).json({ error: "product Not Found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to get product" });
  }
};

// create Product (protected route)

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const createdProduct = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    res.status(200).json(createProduct);
  } catch (error) {
    console.error("Error fetching user's products:", error);
    res.status(500).json({ error: "Failed to get user's products" });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden. You can only update your own products." });
    }

    const updatedProduct = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { id } = req.params;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden. You can only delete your own products." });
    }
    await queries.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
