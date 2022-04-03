import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { fetchCurrentUser } from 'state/auth/authApi';
import Spin from 'components/layout/Spin';

const UserIndex: NextPage = () => {
	const dispatch = useAppDispatch();
	const { currentUserStatus, user } = useAppSelector(state => state.auth);

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	return (
		<>
			<Head>
				<title>{user?.name} @ eLMS</title>
				<meta name='user info' content={user?.name} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{currentUserStatus === 'loading' ? (
				<Spin />
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
		</>
	);
};

export default UserIndex;
