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
	const { user } = useAppSelector(state => state.auth);
	const { account } = useAppSelector(state => state.user);

	useEffect(() => {
		if (user) {
			dispatch(getAccountStatus());

			window.location.href = '/instructor';
		}
	}, [dispatch, user]);

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
