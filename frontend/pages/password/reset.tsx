import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { resetPassword } from 'state/auth/authApi';
import useSnackBar from 'hooks/useSnackbar';
import AlertMessage from 'components/alerts/AlertMessage';
import { ResetPasswordWrapper } from 'styles/Auth';
import {
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword: NextPage = () => {
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useAppDispatch();
	const { user, resetPasswordMsg, resetPasswordStatus } = useAppSelector(
		state => state.auth
	);
	const router = useRouter();
	const { openSnackbar, handleCloseSnackbar, setOpenSnackbar } =
		useSnackBar();

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user, router]);

	useEffect(() => {
		setEmail(window.localStorage.getItem('elmsUserEmail') as string);
	}, []);

	const handleClickShowPassword = useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	const handleMouseDownPassword = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			e.preventDefault();
		},
		[]
	);

	const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await dispatch(
				resetPassword({ email, code, newPassword })
			).unwrap();

			setOpenSnackbar(true);
			setCode('');
			setEmail('');
			setNewPassword('');

			const timeout = setTimeout(() => {
				router.push('/signin');
			}, 5000);

			return () => {
				clearTimeout(timeout);
			};
		} catch (error) {
			setOpenSnackbar(true);
			console.log('ERROR!', error);
		}
	};

	return (
		<ResetPasswordWrapper>
			<Head>
				<title>Reset Password @ eLMS</title>
				<meta name='user password' content='Reset Password Page' />
			</Head>
			<AlertMessage
				openSnackbar={openSnackbar}
				handleCloseSnackbar={handleCloseSnackbar}
				autoHideDuration={5000}
				isCustomized={true}
				severity={
					resetPasswordStatus === 'succeeded' ? 'success' : 'error'
				}
				customizedMsg={resetPasswordMsg}
			/>
			<Container maxWidth='sm'>
				<Typography variant='h4' fontWeight='bold'>
					You're almost done.
				</Typography>
				<Typography
					variant='subtitle1'
					color='secondary'
					sx={{ mb: '15px' }}
				>
					Provide the secret code sent to you and a valid new
					password.
				</Typography>
				<form onSubmit={handleResetPassword} className='form'>
					<FormControl sx={{ mb: 2 }} fullWidth>
						<TextField
							label='Email'
							variant='outlined'
							value={email}
							disabled={true}
						/>
					</FormControl>
					<FormControl sx={{ mb: 2 }} fullWidth>
						<TextField
							label='Secret Code'
							variant='outlined'
							placeholder='Type the secret code.'
							value={code}
							onChange={e => setCode(e.target.value)}
							required={true}
						/>
					</FormControl>
					<FormControl sx={{ mb: 2 }} fullWidth>
						<InputLabel htmlFor='newPassword' required={true}>
							New Password
						</InputLabel>
						<OutlinedInput
							id='newPassword'
							label='New Password'
							placeholder='Type your new password'
							type={showPassword ? 'text' : 'password'}
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							required={true}
							endAdornment={
								newPassword ? (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={
												handleMouseDownPassword
											}
											edge='end'
										>
											{showPassword ? (
												<VisibilityOff fontSize='small' />
											) : (
												<Visibility fontSize='small' />
											)}
										</IconButton>
									</InputAdornment>
								) : null
							}
						/>
					</FormControl>
					<LoadingButton
						loading={resetPasswordStatus === 'loading'}
						variant='contained'
						disableElevation
						type='submit'
					>
						Reset
					</LoadingButton>
				</form>
			</Container>
		</ResetPasswordWrapper>
	);
};

export default ResetPassword;
