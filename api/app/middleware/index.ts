import { Request } from 'express';
import expressJWT, {
	SecretCallback,
	SecretCallbackLong,
	secretType,
} from 'express-jwt';

export const requireSignin = expressJWT({
	getToken: (req: Request) => req.cookies.token,
	secret: process.env.JWT_SECRET as
		| secretType
		| SecretCallback
		| SecretCallbackLong,
	algorithms: ['HS256'],
});
