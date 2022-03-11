import { useState } from 'react';

const useSnackBar = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCloseSnackbar = (e: React.ElementType, reason: string) => {
		if (reason === 'clickaway') return;

		setOpenSnackbar(false);
	};

	return {
		openSnackbar,
		setOpenSnackbar,
		handleCloseSnackbar,
	};
};

export default useSnackBar;
