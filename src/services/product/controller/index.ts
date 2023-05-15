import { Request, Response, Router } from 'express';

import ProductService from './../index';
const router = Router();
import ServiceError from '@shared/utils/http-response-errors';
import HttpStatusCodes from 'http-status-codes';

import { buildProductResponse, parseProductQuery, parseProductRequest } from './transformer';

router.get('/', async (req: Request, res: Response) => {
	const query = parseProductQuery(req.query);
	const products = (await ProductService.search(query, {}))?.map(el => buildProductResponse(el));
	res.status(HttpStatusCodes.OK).send(products);
});
router.get('/:id', async (req: Request, res: Response) => {
	const product = await ProductService.loadById(req.params.id, {});
	if (!product) {
		throw new ServiceError(
			HttpStatusCodes.NOT_FOUND,
			'unkown_resource',
			'Did not find the resource you were trying to fetch.'
		);
	}
	res.status(HttpStatusCodes.OK).send(buildProductResponse(product));
});

router.put('/', async (req: Request, res: Response) => {
	const inputProduct = parseProductRequest(req.body);
	try {
		const updatedProduct = await ProductService.update(inputProduct, {});
		res.status(HttpStatusCodes.OK).send(buildProductResponse(updatedProduct));
	} catch (e) {
		throw new ServiceError(HttpStatusCodes.NOT_FOUND, 'server_error', 'We were not able to update this product.');
	}
});

router.post('/', async (req: Request, res: Response) => {
	const product = await ProductService.create(parseProductRequest(req.body), {});
	res.status(HttpStatusCodes.OK).send(buildProductResponse(product));
});

router.delete('/:productId', async (req: Request, res: Response) => {
	await ProductService.delete(req.params.productId, {});
	res.status(HttpStatusCodes.OK).send();
});

export default router;
