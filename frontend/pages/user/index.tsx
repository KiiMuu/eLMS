import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { fetchCurrentUser } from 'state/auth/authApi';
import UserRoute from 'components/routes/UserRoute';
import UserLayout from 'components/layout/UserLayout';
import Spin from 'components/layout/Spin';
import { Box } from '@mui/material';

const UserPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const { currentUserStatus, user } = useAppSelector(state => state.auth);

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return (
		<UserRoute>
			<UserLayout>
				<Head>
					<title>{user?.name || 'User'} @ eLMS</title>
					<meta name='user info' content={user?.name} />
				</Head>
				{currentUserStatus === 'loading' ? (
					<Box sx={{ height: '100vh' }}>
						<Spin />
					</Box>
				) : (
					<div>main content here!!!!!!!!!!!</div>
				)}
			</UserLayout>
		</UserRoute>
	);
};

export default UserPage;
