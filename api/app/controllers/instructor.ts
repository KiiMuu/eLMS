import { Request, Response } from 'express';
import User from '../models/User';
import Stripe from 'stripe';
import queryString from 'query-string';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2020-08-27',
});

const becomeInstructor = async (req: any, res: Response): Promise<object> => {
	try {
		const user = await User.findById(req.user?._id).exec();

		if (!user?.stripe_account_id) {
			const account = await stripe.accounts.create({ type: 'express' });

			// That's the non-null assertion operator. It is a way to tell the compiler
			// "this expression cannot be null or undefined here.
			user!.stripe_account_id = account.id;

			user?.save();
		}

		let accountLink = await stripe.accountLinks.create({
			account: user!.stripe_account_id,
			refresh_url: process.env.STRIPE_REDIRECT_URL as string,
			return_url: process.env.STRIPE_REDIRECT_URL as string,
			type: 'account_onboarding',
		});

		accountLink = Object.assign(accountLink, {
			'stripe_user[email]': user?.email,
		});

		return res.json(
			`${accountLink.url}?${queryString.stringify(accountLink)}`
		);
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const getAccountStatus = async (
	req: any,
	res: Response
): Promise<object | void> => {
	try {
		const user = await User.findById(req.user?._id).exec();
		const account = await stripe.accounts.retrieve(user!.stripe_account_id);

		if (!account.charges_enabled) {
			return res.status(401).json('Unauthorized');
		} else {
			const statusUpdated = await User.findByIdAndUpdate(
				user?.id,
				{
					stripe_seller: account,
					$set: { role: 'instructor' },
				},
				{ new: true }
			)
				.select('-password')
				.exec();

			res.json(statusUpdated);
		}
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const getCurrentInstructor = async (
	req: any,
	res: Response
): Promise<object | void> => {
	try {
		const user = await User.findById(req.user?._id)
			.select('-password')
			.exec();

		if (user?.role !== 'instructor') {
			return res.sendStatus(403);
		}

		return res.json({ ok: true });
	} catch (error: any) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

export { becomeInstructor, getAccountStatus, getCurrentInstructor };
