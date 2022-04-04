import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { forgotPassword } from 'state/auth/authApi';
import useSnackBar from 'hooks/useSnackbar';
import AlertMessage from 'components/alerts/AlertMessage';
import { ResetPasswordWrapper } from 'styles/Auth';
import { Container, FormControl, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const ForgotPassword: NextPage = () => {
	const [email, setEmail] = useState('');

	const dispatch = useAppDispatch();
	const { user, forgotPasswordStatus, forgotPasswordMsg } = useAppSelector(
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
		if (forgotPasswordStatus === 'succeeded') {
			window.localStorage.setItem('elmsUserEmail', email);
		}
	}, [forgotPasswordStatus, router]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await dispatch(forgotPassword({ email })).unwrap();

			setOpenSnackbar(true);

			const timeout = setTimeout(() => {
				router.push('/password/reset');
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
				<title>Forgot Password @ eLMS</title>
				<meta name='user password' content='Forgot Password Page' />
			</Head>
			<AlertMessage
				openSnackbar={openSnackbar}
				handleCloseSnackbar={handleCloseSnackbar}
				autoHideDuration={5000}
				isCustomized={true}
				severity={
					forgotPasswordStatus === 'succeeded' ? 'success' : 'error'
				}
				customizedMsg={forgotPasswordMsg}
			/>
			<Container maxWidth='sm'>
				<Typography variant='h4' fontWeight='bold'>
					We will email you.
				</Typography>
				<Typography
					variant='subtitle1'
					color='secondary'
					sx={{ mb: '15px' }}
				>
					we will send you a breif email contains a secret code to
					reset your password.
				</Typography>
				<form onSubmit={handleSubmit} className='form'>
					<FormControl sx={{ mb: 2 }} fullWidth>
						<TextField
							label='Email'
							variant='outlined'
							placeholder='Type your email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							error={
								forgotPasswordStatus === 'failed' ? true : false
							}
							required={true}
						/>
					</FormControl>
					<LoadingButton
						loading={forgotPasswordStatus === 'loading'}
						variant='contained'
						disableElevation
						type='submit'
					>
						Send Reset Code
					</LoadingButton>
				</form>
			</Container>
		</ResetPasswordWrapper>
	);
};

export default ForgotPassword;
