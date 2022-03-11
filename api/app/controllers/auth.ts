import { Request, Response } from 'express';
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
			return res.status(400).json({
				msg: 'That user with this email already exists.',
			});
		}

		let hashedPassword = await hashPassword(password);

		let user = await new User({
			name,
			email,
			password: hashedPassword,
		}).save();

		return res.json(user);
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

export { signup };
