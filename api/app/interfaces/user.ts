export interface IUserModel {
	name: string;
	email: string;
	password: string;
	picture: string;
	role: string[];
	stripe_account_id: string;
	stripe_seller: object;
	stripeSession: object;
}
