import { model, Schema } from 'mongoose';
import { IUserModel } from '../interfaces/user';

const userSchema: Schema = new Schema<IUserModel>(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
		picture: {
			type: String,
			default: '/avatar.png',
		},
		role: {
			type: [String],
			default: ['subscriber'],
			enum: ['subscriber', 'instructor', 'admin'],
		},
		stripe_account_id: '',
		stripe_seller: {},
		stripeSession: {},
	},
	{
		timestamps: true,
	}
);

const UserModel = model<IUserModel>('User', userSchema);

export default UserModel;
