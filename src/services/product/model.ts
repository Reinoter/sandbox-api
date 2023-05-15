import Entity from '@shared/models/entity';

export const ProductID = 'Product';
interface Product extends Entity {
	name: string;
	description: string;
}

export default Product;
