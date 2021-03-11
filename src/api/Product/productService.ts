import crypto from "crypto";
import { AppError } from "../../utils/app-error";
import { IProduct } from ".";
import { ProductModel } from "./productModel";
import slugify from "slugify";

export class ProductService {
	public addProduct = async (productData: IProduct) => {
		const isExist = await ProductModel.findOne({
			where: {
				product_name: productData.product_name,
			},
		});
		if (isExist) {
			throw new AppError(`A product with that name already exists.`);
		}
		productData.slug = this.createSlug(productData.product_name);
		const product = await ProductModel.create(productData);
		if (product) {
			return ProductModel.findByPk(product.id);
		}
		throw new AppError("Could not create product", null, 404);
	};

	public getProduct = async (slug: any) => {
		const product = await ProductModel.findOne({
			where: {
				slug,
			},
		});
		if (product) {
			const productAsJson = product.toJSON();
			return productAsJson;
		}
		throw new AppError(`Products not found.`, null, 404);
	};

	public getAllProduct = async () => {
		const products = await ProductModel.findAll();
		if (products) {
			const productsAsJson = await Promise.all(products.map(async (product) => {
				let productsAsJson = product.toJSON();
				productsAsJson.product_varieties = JSON.parse(productsAsJson.product_varieties) || [];
				return productsAsJson;
			}));
			return productsAsJson;
		}
		throw new AppError("Products not found", null, 404);
	};

	public updateProduct = async (slug, productData: IProduct) => {
		const product = await ProductModel.findOne({
			where: {
				slug,
			},
		});

		if (product) {
			// associations have been set
			const updated = await ProductModel.update(productData, {
				where: {
					slug,
				},
			});

			if (updated) {
				const newProduct = await this.getProduct(slug);
				return newProduct;
			}
			throw new AppError("Could not update product", null, 404);
		}
		throw new AppError("Product not found", null, 404);
	};

	public deleteProduct = async (slug: string) => {
		const product = await ProductModel.findOne({
			where: {
				slug,
			},
		});
		if (product) {
			const softDeleted = await ProductModel.destroy({
				where: {
					slug,
				},
			});
			if (softDeleted) {
				return "Product deleted successfully";
			}
			throw new AppError("Could not delete product", null, 403);
		}
		return null;
	};

	/**
	 * Create a new slug (unique url string) for the project
	 * @param {string} str the project title
	 * @return {string} the new slug string
	 */
	private createSlug = (str: string) => {
		let newString = slugify(str, {
			remove: /[*+~.()'"!?:/@#${}<>,]/g,
			lower: true,
		});
		const random = crypto.randomBytes(6).toString("hex");
		newString = `${newString}-${random}`;

		return newString;
	};
}
