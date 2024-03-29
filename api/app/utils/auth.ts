import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (error, salt) => {
			if (error) reject(error);

			bcrypt.hash(password, salt, (error, hash) => {
				if (error) reject(error);

				resolve(hash);
			});
		});
	});
};

export const comparePassword = (password: string, hashedPassword: string) => {
	return bcrypt.compare(password, hashedPassword);
};
