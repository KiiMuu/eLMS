import { Request, Response } from 'express';

const signup = (req: Request, res: Response) => {
	return res.status(200).json({ user: 'Karim Muhamad @ /signup route!' });
};

export { signup };
