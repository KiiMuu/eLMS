import { Request, Response, NextFunction } from 'express';
import isEmail from '../utils/isEmail';
import { IErrorData } from '../interfaces/auth';

export const areValidAuthInputs = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, email, password } = req.body;

	let errors: IErrorData[] = [];

	if (req.originalUrl === '/api/auth/signup' && (!name || name.length < 2)) {
		errors.push({
			param: 'name',
			msg: 'Name must be provided and at least 2 characters long.',
		});
	}
	if (!email) {
		errors.push({ param: 'email', msg: 'Email must be provided.' });
	} else if (!isEmail(email)) {
		errors.push({
			param: 'email',
			msg: 'Please provide a valid email address.',
		});
	}
	if (!password || password.length < 6) {
		errors.push({
			param: 'password',
			msg: 'Password must be provided and at least 6 characters long.',
		});
	}

	if (errors.length) {
		return res.status(422).json(errors);
	}

	next();
};

export const validateResetPasswordFields = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { code, newPassword } = req.body;

	if (!code) {
		return res
			.status(422)
			.json('Please provide the code that sent to your email.');
	} else if (code.length !== 6) {
		return res
			.status(422)
			.json('Secert code must contain 6 characters long.');
	}

	if (!newPassword || newPassword.length < 6) {
		return res
			.status(422)
			.json('Password must be provided and at least 6 characters long.');
	}

	next();
};
