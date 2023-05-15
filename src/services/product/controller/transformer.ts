import { Product, ProductQuery } from './../index';
export interface IProduct {
	sub?: string;
	description: string;
	name: string;
}

export const parseProductRequest = (metadata: IProduct): any => {
	return {
		_id: metadata.sub,
		name: metadata.name,
		description: metadata.description,
	};
};
export const parseProductQuery = (_metadata: any): ProductQuery => {
	const query = {};
	return query;
};

export const buildProductResponse = (product: Product): IProduct => {
	console.info(1, product);
	return {
		sub: product._id,
		name: product.name,
		description: product.description,
	};
};
