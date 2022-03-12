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

export interface ISignUpForm {
	name: string;
	setName: (e: string) => void;
	email: string;
	setEmail: (e: string) => void;
	password: string;
	setPassword: (e: string) => void;
	signupErrors: IErrorData[];
	signupStatus: string;
	showPassword: boolean;
	handleMouseDownPassword: (e: React.MouseEvent<HTMLElement>) => void;
	handleClickShowPassword: () => void;
}
