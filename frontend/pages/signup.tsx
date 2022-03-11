import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signup } from 'state/auth/authApi';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { IErrorData, User } from 'interfaces/auth';
import AlertMessage from 'components/alerts/AlertMessage';
import useSnackBar from 'hooks/useSnackbar';
import { AuthWrapper } from 'styles/Auth';
import {
	Container,
	FormControl,
	Grid,
	TextField,
	Typography,
	Button,
	Stack,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	FormHelperText,
	useMediaQuery,
	Theme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const handleMouseDownPassword = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
	};

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
		<AuthWrapper>
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
									gutterBottom
								>
									Online Courses
								</Typography>
								<Typography variant='h5' fontWeight='bold'>
									Learn anything, On your schedule | eLMS
								</Typography>
							</div>
						</Container>
					</div>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<form onSubmit={handleSignUp} className='form'>
						<Container maxWidth='xl'>
							<div className='formContent'>
								<Typography
									variant='h4'
									gutterBottom
									fontWeight='bold'
									color='primary'
								>
									Sign Up, Now!
								</Typography>
								<Typography variant='subtitle2'>
									Create a new account, and start learning
								</Typography>
								<FormControl sx={{ mt: 2 }} fullWidth>
									<TextField
										label='Name'
										variant='outlined'
										placeholder='Type your name'
										value={name}
										onChange={e => setName(e.target.value)}
										error={
											signupErrors?.find(
												(e: IErrorData) =>
													e.param === 'name'
											)
												? true
												: false
										}
										helperText={signupErrors?.map(
											(e: IErrorData) =>
												e.param === 'name'
													? e.msg
													: null
										)}
									/>
								</FormControl>
								<FormControl sx={{ mt: 2 }} fullWidth>
									<TextField
										label='Email'
										variant='outlined'
										placeholder='Type your email'
										value={email}
										onChange={e => setEmail(e.target.value)}
										error={
											signupErrors?.find(
												(e: IErrorData) =>
													e.param === 'email' ||
													!e.param
											)
												? true
												: false
										}
										helperText={signupErrors?.map(
											(e: IErrorData) =>
												e.param === 'email'
													? e.msg
													: null
										)}
									/>
								</FormControl>
								<FormControl sx={{ mt: 2 }} fullWidth>
									<InputLabel htmlFor='password'>
										Password
									</InputLabel>
									<OutlinedInput
										error={
											signupErrors?.find(
												(e: IErrorData) =>
													e.param === 'password'
											)
												? true
												: false
										}
										id='password'
										label='Password'
										placeholder='Type your password'
										type={
											showPassword ? 'text' : 'password'
										}
										value={password}
										onChange={e =>
											setPassword(e.target.value)
										}
										endAdornment={
											password ? (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={
															handleClickShowPassword
														}
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
									<FormHelperText
										error={
											signupErrors?.find(
												(e: IErrorData) =>
													e.param === 'password'
											)
												? true
												: false
										}
									>
										{signupErrors?.map((e: IErrorData) =>
											e.param === 'password'
												? e.msg
												: null
										)}
									</FormHelperText>
								</FormControl>
								<Stack
									direction='row'
									justifyContent='space-between'
									alignItems='center'
									flexWrap='wrap'
									gap='1'
									marginTop='20px'
									spacing={2}
								>
									<LoadingButton
										loading={signupStatus === 'loading'}
										variant='contained'
										disableElevation
										type='submit'
									>
										Sign Up
									</LoadingButton>
									<Link href='/signin'>
										<Button
											disableElevation
											color='info'
											sx={{ textTransform: 'unset' }}
										>
											Already registered? Sign in
										</Button>
									</Link>
								</Stack>
								<Link href='/password/reset'>
									<Button
										disableElevation
										sx={{
											padding: '0',
											mt: '10px',
											textTransform: 'unset',
										}}
										color='info'
									>
										Forgot password? Reset
									</Button>
								</Link>
							</div>
						</Container>
					</form>
				</Grid>
			</Grid>
		</AuthWrapper>
	);
};

export default Signup;
