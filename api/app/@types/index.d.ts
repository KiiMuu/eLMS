interface IUser {
	_id: string;
	id: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}
