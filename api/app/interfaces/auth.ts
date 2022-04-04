import { Document } from 'mongoose';

export interface IUserModel extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
	picture: string;
	role: string;
	passwordResetCode: string;
	stripe_account_id: string;
	stripe_seller: object;
	stripeSession: object;
}

export interface IErrorData {
	param: string;
	msg: string;
}
