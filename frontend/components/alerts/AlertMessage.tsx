import { forwardRef, ForwardedRef } from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { CloseOutlined } from '@mui/icons-material';
import { IAlertMessage } from 'interfaces';

const Alert = forwardRef(function Alert(
	props: any,
	ref: ForwardedRef<HTMLDivElement>
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AlertMessage: React.FC<IAlertMessage> = ({
	openSnackbar,
	handleCloseSnackbar,
	isCustomized = false,
	autoHideDuration = 3000,
	severity,
	customizedMsg,
	message,
	vertical = 'bottom',
	horizontal = 'left',
}) => {
	const action = (
		<>
			<Button
				color='secondary'
				size='small'
				onClick={handleCloseSnackbar}
			>
				UNDO
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleCloseSnackbar}
			>
				<CloseOutlined fontSize='small' />
			</IconButton>
		</>
	);

	return isCustomized ? (
		<Snackbar
			open={openSnackbar}
			autoHideDuration={autoHideDuration}
			onClose={handleCloseSnackbar}
			anchorOrigin={{ vertical, horizontal }}
		>
			<Alert onClose={handleCloseSnackbar} severity={severity}>
				{customizedMsg}
			</Alert>
		</Snackbar>
	) : (
		<Snackbar
			open={openSnackbar}
			autoHideDuration={autoHideDuration}
			onClose={handleCloseSnackbar}
			message={message}
			action={action}
			anchorOrigin={{ vertical, horizontal }}
		/>
	);
};

export default AlertMessage;
