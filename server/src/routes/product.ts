import { Router } from "express";
import { createProduct, deleteImage, deleteProduct, getLatest, getListings, getProduct, getProductsByCategory, updateProduct } from "src/controllers/product";
import { isAuth } from "src/middleware/auth";
import { fileParser } from "src/middleware/fileParser";
import { validate } from "src/middleware/validator";
import { newProductSchema } from "src/utils/validationSchema";

const productRouter = Router();

productRouter.post("/", isAuth, fileParser, validate(newProductSchema), createProduct)
productRouter.get("/detail/:id", isAuth, getProduct)
productRouter.patch("/:id", isAuth, fileParser, validate(newProductSchema), updateProduct)
productRouter.delete("/:id", isAuth, deleteProduct)
productRouter.delete("/:id/image/:imageId", isAuth, deleteImage)
productRouter.get("/by-category/:category", isAuth, getProductsByCategory)
productRouter.get("/latest", isAuth, getLatest)
productRouter.get("/listings", isAuth, getListings)


export default productRouter;