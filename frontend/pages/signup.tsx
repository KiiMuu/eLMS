import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signup } from 'state/auth/authApi';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import SignUpForm from 'components/forms/SignUpForm';
import { IErrorData, User } from 'interfaces/auth';
import AlertMessage from 'components/alerts/AlertMessage';
import useSnackBar from 'hooks/useSnackbar';
import { AuthWrapper } from 'styles/Auth';
import {
	Container,
	Grid,
	Typography,
	useMediaQuery,
	Theme,
	Button,
} from '@mui/material';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	let [user, setUser] = useState<User | null>(null);

	const dispatch = useAppDispatch();
	const { signupStatus, signupErrors } = useAppSelector(state => state.auth);
	const md = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
	const { openSnackbar, handleCloseSnackbar, setOpenSnackbar } =
		useSnackBar();
	const router = useRouter();

	const handleClickShowPassword = useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	const handleMouseDownPassword = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			e.preventDefault();
		},
		[]
	);

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			let res = await dispatch(
				signup({ name, email, password })
			).unwrap();

			setUser(res);
		} catch (error) {
			setOpenSnackbar(true);
			console.log('ERROR!', error);
		}
	};

	useEffect(() => {
		if (typeof window !== undefined) {
			window.localStorage.setItem('elmsUser', JSON.stringify(user));
		}

		if (signupStatus === 'succeeded') {
			router.push('/');
		}
	}, [user]);

	return (
		<AuthWrapper route={router.route === '/signup' ? 'signup' : 'signin'}>
			<Head>
				<title>Sign Up | eLMS</title>
				<meta name='description' content='Sign Up | eLMS' />
			</Head>
			{signupErrors?.map((error: IErrorData, i: number) =>
				!error.param ? (
					<AlertMessage
						key={i}
						openSnackbar={openSnackbar}
						handleCloseSnackbar={handleCloseSnackbar}
						autoHideDuration={5000}
						isCustomized={true}
						severity='error'
						customizedMsg={error.msg}
					/>
				) : null
			)}
			<Grid container spacing={[0]}>
				<Grid item xs={12} sm={6} md={8}>
					<div className='heading'>
						<Container maxWidth='xl'>
							<div className='headingContent'>
								<Typography
									variant={md ? 'h3' : 'h1'}
									fontWeight='bold'
									color='primary'
								>
									Online Courses
								</Typography>
								<Typography variant='h5' fontWeight='bold'>
									Learn anything, On your schedule @ eLMS
								</Typography>
								<Link href='/courses'>
									<Button
										size='large'
										color='primary'
										variant='contained'
										disableElevation
										sx={{ mt: '35px' }}
									>
										All Courses
									</Button>
								</Link>
							</div>
						</Container>
					</div>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<form onSubmit={handleSignUp} className='form'>
						<Container maxWidth='xl'>
							<div className='formContent'>
								<SignUpForm
									name={name}
									setName={setName}
									email={email}
									setEmail={setEmail}
									password={password}
									setPassword={setPassword}
									signupErrors={signupErrors}
									signupStatus={signupStatus}
									showPassword={showPassword}
									handleMouseDownPassword={
										handleMouseDownPassword
									}
									handleClickShowPassword={
										handleClickShowPassword
									}
								/>
							</div>
						</Container>
					</form>
				</Grid>
			</Grid>
		</AuthWrapper>
	);
};

export default Signup;
