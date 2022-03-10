import { Request, Response } from 'express';

const signup = (req: Request, res: Response) => {
	return res.json({ name: 'Karim Muhamad @ /signup route' });
};

export { signup };
