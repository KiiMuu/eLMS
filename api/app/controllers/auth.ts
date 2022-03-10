import { Request, Response } from 'express';

const signup = (req: Request, res: Response) => {
	console.log(req.body);
	return res.status(200).json({ user: 'Karim Muhamad @ /signup route!' });
};

export { signup };
