import { ServiceContext } from '@services';
import ServiceError from '@shared/utils/http-response-errors';
import HttpStatusCodes from 'http-status-codes';

import Product, { ProductID } from './model';
import ProductRepository from './repository';

export interface ProductQuery {}
class ProductService {
	async search(query: ProductQuery, _ctx: ServiceContext): Promise<Product[]> {
		const productRepo = await ProductRepository;
		const items = await productRepo.find(query, null);
		console.info(items);
		return items;
	}
	async create(productParsedRequestData: Product, _ctx: ServiceContext): Promise<Product> {
		const productRepo = await ProductRepository;
		return productRepo.create(productParsedRequestData);
	}
	async delete(productId: string, ctx: ServiceContext) {
		const product = await this.loadById(productId, ctx);
		await product.remove();
	}

	async loadById(id: string, _ctx: ServiceContext): Promise<Product> {
		const productRepo = await ProductRepository;
		const product = await productRepo.findById(id);
		if (!product) {
			throw new ServiceError(
				HttpStatusCodes.BAD_REQUEST,
				'invalid_product',
				"We couldn't find the product you were looking for"
			);
		}
		return product;
	}
	async update(newProductData: Product, ctx: ServiceContext) {
		const product = await this.loadById(newProductData._id, ctx);
		const productRepo = await ProductRepository;
		return (await productRepo.findOneAndUpdate({ _id: product._id }, newProductData, {
			new: true,
		})) as Product;
	}
}

export default new ProductService();
export { Product, ProductID };
export { default as router } from './controller';
