import express from "express";
import { validation } from "../../middleware";
import { controllerHandler } from "../../shared/controllerHandler";
import { ProductController } from "./productController";
import { ProductValidationSchema } from "./productValidation";

const router = express.Router();
const call = controllerHandler;
const Product = new ProductController();
router.use(validation(ProductValidationSchema));

router.get("/", call(Product.index, (req, res, next) => []));

router.post("/save", call(Product.addProduct, (req, res, next) => [req.body]));

router.get("/get-allproduct", call(Product.getAllProduct, (req, _res, _next) => [req.params.slug]));

router.get("/get-product/:slug", call(Product.getProduct, (req, _res, _next) => [req.params.slug]));

router.put("/update-product/:slug", call(Product.updateProduct, (req, res, next) => [req.params.slug, req.req.body]));

router.delete("/delete-product/:slug",
    call(Product.deleteProduct, (req, _res, _next) => [req.params.slug, req.user]));

export const ProductRouter = router;
