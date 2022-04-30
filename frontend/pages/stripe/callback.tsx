import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { getAccountStatus } from 'state/user/userApi';
import Spin from 'components/layout/Spin';
import UserRoute from 'components/routes/UserRoute';
import { Box } from '@mui/material';

const StripeCallback: NextPage = () => {
	const dispatch = useAppDispatch();
	let { user } = useAppSelector(state => state.auth);
	let { instructorAccount, accountStatus } = useAppSelector(
		state => state.user
	);

	useEffect(() => {
		if (user) {
			dispatch(getAccountStatus());
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (accountStatus === 'succeeded') {
			dispatch({
				type: 'auth/current',
				payload: instructorAccount,
			});
			window.localStorage.setItem(
				'elmsUser',
				JSON.stringify(instructorAccount)
			);

			window.location.href = '/instructor';
		}
	}, [dispatch, accountStatus]);

	return (
		<UserRoute>
			<Head>
				<title>Stripe / Callback</title>
				<meta name='Stripe Callback' content='stripe callback' />
			</Head>
			<Box sx={{ height: '100vh' }}>
				<Spin />
			</Box>
		</UserRoute>
	);
};

export default StripeCallback;
