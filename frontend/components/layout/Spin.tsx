import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

interface ISpin {
	size?: string | number;
	color?:
		| 'inherit'
		| 'error'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'info'
		| 'warning'
		| undefined;
}

const Spin: React.FC<ISpin> = ({ size = 20, color = 'secondary' }) => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress size={size} color={color} />
		</Box>
	);
};

export default Spin;
