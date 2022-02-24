interface ResponseSuccess<T = undefined> {
	success: true;
	result: T;
}

interface ResponseError {
	success: false;
	error: {
		name: string;
		message: string;
	};
}

export type MonocleApiResponse<T = undefined> = ResponseSuccess<T> | ResponseError;
