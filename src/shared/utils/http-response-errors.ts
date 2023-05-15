import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class ServiceError extends Error {
	_status: number;
	_code: string;

	constructor(status: number, code: string, message: string) {
		super(message);
		this._status = status;
		this._code = code;
	}

	get status() {
		return this._status;
	}

	get code() {
		return this._code;
	}
}

export interface IError {
	error: string;
	error_description: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
	const { status, response } = buildErrorResponse(err);
	res.status(status).json(response);
};
/* eslint-enable @typescript-eslint/no-unused-vars */

const buildErrorResponse = (e: any): { status: StatusCodes; response: IError } => {
	if (e instanceof ServiceError) {
		return {
			status: e.status,
			response: {
				error: e.code,
				error_description: e.message,
			},
		};
	} else if (e instanceof Error) {
		return {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			response: {
				error: 'internal_server_error',
				error_description: e.message,
			},
		};
	} else {
		return {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			response: {
				error: 'internal_server_error',
				error_description: e,
			},
		};
	}
};
