import Link from 'next/link';
import { IErrorData, IAuthForm } from 'interfaces/auth';
import {
	FormControl,
	TextField,
	Typography,
	Button,
	Stack,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignInForm: React.FC<IAuthForm> = ({
	email,
	setEmail,
	password,
	setPassword,
	signinErrors,
	signinStatus,
	showPassword,
	handleMouseDownPassword,
	handleClickShowPassword,
}) => {
	return (
		<>
			<Typography
				variant='h4'
				fontWeight='bold'
				color='primary'
				gutterBottom
			>
				Sign In
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				Provide your valid credentials to take you up!.
			</Typography>
			<FormControl sx={{ mt: 2 }} fullWidth>
				<TextField
					label='Email'
					variant='outlined'
					placeholder='Type your email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					error={
						signinErrors?.find(
							(e: IErrorData) => e.param === 'email' || !e.param
						)
							? true
							: false
					}
					helperText={signinErrors?.map((e: IErrorData) =>
						e.param === 'email' ? e.msg : null
					)}
				/>
			</FormControl>
			<FormControl sx={{ mt: 2 }} fullWidth>
				<InputLabel
					htmlFor='password'
					error={
						signinErrors?.find(
							(e: IErrorData) => e.param === 'password'
						)
							? true
							: false
					}
				>
					Password
				</InputLabel>
				<OutlinedInput
					error={
						signinErrors?.find(
							(e: IErrorData) => e.param === 'password'
						)
							? true
							: false
					}
					id='password'
					label='Password'
					placeholder='Type your password'
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={e => setPassword(e.target.value)}
					endAdornment={
						password ? (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
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
						signinErrors?.find(
							(e: IErrorData) => e.param === 'password'
						)
							? true
							: false
					}
				>
					{signinErrors?.map((e: IErrorData) =>
						e.param === 'password' ? e.msg : null
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
					loading={signinStatus === 'loading'}
					variant='contained'
					disableElevation
					type='submit'
				>
					Sign In
				</LoadingButton>
				<Link href='/signup' passHref>
					<Button
						disableElevation
						color='secondary'
						sx={{ textTransform: 'unset' }}
					>
						Haven&apos;t an account? Sign up
					</Button>
				</Link>
			</Stack>
			<Link href='/password/forgot' passHref>
				<Button
					disableElevation
					sx={{
						padding: '0',
						mt: '10px',
						textTransform: 'unset',
					}}
					color='secondary'
				>
					Forgot password? Reset
				</Button>
			</Link>
		</>
	);
};

export default SignInForm;
