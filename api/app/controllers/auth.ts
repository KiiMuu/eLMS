import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { CourierClient } from '@trycourier/courier';
import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/auth';
import isEmail from '../utils/isEmail';

const courier = CourierClient({
	authorizationToken: process.env.COURIER_API_KEY,
});

const signup = async (
	req: Request,
	res: Response
): Promise<object | string> => {
	try {
		const { name, email, password } = req.body;

		let isUserExist = await User.findOne({ email }).exec();

		if (isUserExist) {
			return res.status(400).json([
				{
					msg: 'That user with this email already exists.',
				},
			]);
		}

		let hashedPassword = await hashPassword(password);

		let user = await new User({
			name,
			email,
			password: hashedPassword,
		}).save();

		user.password = undefined!;

		return res.json(user);
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const signin = async (
	req: Request,
	res: Response
): Promise<object | string> => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ email }).exec();

		if (!user) {
			return res.status(400).json([
				{
					msg: 'That user with this email does not exists.',
				},
			]);
		}

		const isMatch = await comparePassword(password, user.password);

		if (!isMatch) {
			return res.status(400).json([
				{
					param: 'password',
					msg: 'Incorrect password, please double check it out.',
				},
			]);
		}

		const token = jwt.sign(
			{ _id: user._id },
			process.env.JWT_SECRET as string,
			{ expiresIn: '7d' }
		);

		user.password = undefined!;

		res.cookie('token', token, {
			httpOnly: true,
			// secure: true // only works on https!
		});

		return res.json(user);
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const getCurrentUser = async (req: Request, res: Response): Promise<object> => {
	try {
		// @ts-ignore: Unreachable code error
		let currentUser = await User.findById(req.user?._id)
			.select('-password -passwordResetCode')
			.exec();

		return res.json(currentUser);
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const forgotPassword = async (req: Request, res: Response): Promise<object> => {
	try {
		const { email } = req.body;

		const shortCode = nanoid(6).toUpperCase();

		const user = await User.findOneAndUpdate(
			{ email },
			{ passwordResetCode: shortCode }
		).exec();

		if (!email) {
			return res.status(422).json('Email must be provided.');
		} else if (!isEmail(email)) {
			return res.status(400).json('Invalid email address.');
		}

		if (!user) {
			return res
				.status(400)
				.json('Oops!, it seems that user does not exists.');
		}

		// send email to user
		await courier.send({
			message: {
				to: {
					email,
					data: {
						shortCode,
					},
				},
				template: process.env.COURIER_TEMPLATE_ID as string,
				data: { variables: 'shortCode' },
			},
		});

		return res.json({ ok: true });
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const resetPassword = async (req: Request, res: Response): Promise<object> => {
	try {
		const { email, code, newPassword } = req.body;

		let user = await User.findOne({ email }).exec();

		if (code.toString() !== user?.passwordResetCode.toString()) {
			return res.status(400).json('Invalid secret code.');
		}

		let hashedPassword = await hashPassword(newPassword);

		await User.findOneAndUpdate(
			{ email, passwordResetCode: code },
			{
				password: hashedPassword,
				passwordResetCode: '',
			}
		).exec();

		return res.json({ ok: true });
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const signout = async (req: Request, res: Response): Promise<object> => {
	try {
		res.clearCookie('token');

		return res.json({ msg: 'Signed out success.' });
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

export {
	signup,
	signin,
	getCurrentUser,
	forgotPassword,
	resetPassword,
	signout,
};
