import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { fetchCurrentUser } from 'state/auth/authApi';
import UserRoute from 'components/layout/UserRoute';
import Spin from 'components/layout/Spin';
import { Box } from '@mui/material';

const UserIndex: NextPage = () => {
	const dispatch = useAppDispatch();
	const { currentUserStatus, user } = useAppSelector(state => state.auth);

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return (
		<UserRoute>
			<Head>
				<title>{user?.name || 'User'} @ eLMS</title>
				<meta name='user info' content={user?.name} />
			</Head>
			{currentUserStatus === 'loading' ? (
				<Box sx={{ height: '100vh' }}>
					<Spin />
				</Box>
			) : (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
					}}
				>
					<pre>{JSON.stringify(user, null, 4)}</pre>
				</div>
			)}
		</UserRoute>
	);
};

export default UserIndex;
