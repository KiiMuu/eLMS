export interface signupData {
	name: string;
	email: string;
	password: string;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	token: string;
}

export interface IErrorData {
	param: string;
	msg: string;
}
