import { BaseController } from "../baseController";
import { ProductService } from "./productService";

/**
 * Product controller
 *
 * @export
 * @class ProductController
 */
export class ProductController extends BaseController {
	private _productService = new ProductService();

	public index = () => {
		return this.sendResponse("Product is working fine!");
	};

	/**
	 * add product data
	 */
	public addProduct = async (productData) => {
		const product = await this._productService.addProduct(productData);
		return this.sendResponse(product);
	};

	/**
	 * updates product data
	 */
	public updateProduct = async (slug: any, productData: any) => {
		const updated = await this._productService.updateProduct(slug, productData);
		return this.sendResponse(updated);
	};

	/**
	 * getProduct
	 */
	public getProduct = async (id: string) => {
		const product = await this._productService.getProduct(id);
		return this.sendResponse(product);
	};

	/**
	 * getProduct
	 */
	public getAllProduct = async () => {
		const allProduct = await this._productService.getAllProduct();
		return this.sendResponse(allProduct);
	};

	/**
	 * delete product data
	 */
	public deleteProduct = async (slug: string) => {
		const deleted = await this._productService.deleteProduct(slug);
		return this.sendResponse(deleted);
	};
}
