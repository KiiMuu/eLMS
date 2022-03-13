import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/auth';

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

		const match = await comparePassword(password, user.password);

		if (!match) {
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

		res.cookie('elmsToken', token, {
			httpOnly: true,
			// secure: true // only works on https
		});

		return res.json(user);
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const signout = async (req: Request, res: Response): Promise<object> => {
	try {
		res.clearCookie('elmsToken');

		return res.json({ msg: 'Signed out success.' });
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

export { signup, signin, signout };
