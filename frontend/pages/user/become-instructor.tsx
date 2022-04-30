import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { becomeAnInstructor } from 'state/user/userApi';
import { Box, Container, Button, Typography } from '@mui/material';
import { SwitchAccountRounded } from '@mui/icons-material';

const BecomeInstructor: NextPage = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.auth);
	const { becomeInstructorStatus, accountLinkUrl } = useAppSelector(
		state => state.user
	);

	const becomeIns = async () => {
		try {
			await dispatch(becomeAnInstructor());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (becomeInstructorStatus === 'succeeded') {
			window.location.href = accountLinkUrl;
		}
	}, [becomeInstructorStatus, accountLinkUrl]);

	return (
		<>
			<Head>
				<title>Become Instructor @ eLMS</title>
				<meta name='become instructor' content='Be an instructor' />
			</Head>
			<Container maxWidth='xl'>
				<Box sx={{ mt: 'var(--navHeight)', p: 4, textAlign: 'center' }}>
					<SwitchAccountRounded fontSize='large' />
					<Typography variant='h1' gutterBottom>
						Become Instructor.
					</Typography>
					<Typography variant='h6'>
						Setup payout to publish courses @ eLMS.
					</Typography>
					<Typography variant='subtitle1' color='secondary'>
						eLMS partners with stripe to transfer earnings to your
						bank account.
					</Typography>
					<Button
						sx={{ display: 'block', m: '10px auto' }}
						variant='outlined'
						color='primary'
						size='large'
						onClick={becomeIns}
						disabled={
							user?.role === 'instructor' ||
							becomeInstructorStatus === 'loading'
						}
					>
						{becomeInstructorStatus === 'loading'
							? 'Loading...'
							: 'Payout Setup'}
					</Button>
					<Typography variant='caption' color='secondary'>
						You will be redirected to stripe to complete onboarding
						process.
					</Typography>
				</Box>
			</Container>
		</>
	);
};

export default BecomeInstructor;
