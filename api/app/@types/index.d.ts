interface IUser {
	_id: string;
}

declare global {
	namespace Express {
		interface Request {
			user: IUser;
		}
	}
}
