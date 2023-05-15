import packageDetails from '@root/package.json';
import swaggerJsoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options: swaggerJsoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: packageDetails.name,
			version: packageDetails.version,
			description: 'Core API services for the Example platform.',
		},
	},
	apis: ['./src/shared/openapi_base.yaml', './src/controllers/**/*.ts', './src/controllers/**/schemas.yaml'],
};

interface SwaggerSpecification {
	openapi: string;
	components: {
		securitySchemes: object;
		parameters: object;
		schemas: object;
		responses: object;
	};
	servers: [
		{
			url: string;
			description: string;
		}
	];
	paths: object;
	tags: [
		{
			name: string;
			description: string;
		}
	];
	info: {
		title: string;
		description: string;
		version: string;
	};
}

export const specification = swaggerJsoc(options) as SwaggerSpecification;

export const assets = swaggerUI.serve;
export const ui = swaggerUI.setup(specification);
