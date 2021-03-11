import Joi from "joi";
import { IProduct } from "./IProduct";

export const ProductValidationSchema = Joi.object().keys({
    product_name: Joi.string(),
    product_description: Joi.string(),
    slug: Joi.string(),
    product_varieties: Joi.any(),
} as IProduct);
