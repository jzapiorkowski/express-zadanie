import { Router } from "express";
import {
  getAllProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  productsReport,
} from "../Controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/products", getAllProducts);
productsRouter.post("/products", postProduct);
productsRouter.put("/products/:id", updateProduct);
productsRouter.delete("/products/:id", deleteProduct);
productsRouter.get("/products/report", productsReport);

export default productsRouter;
