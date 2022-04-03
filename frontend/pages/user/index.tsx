import { useState, useEffect } from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';

const UserIndex: NextPage = () => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await axios.get('/api/auth/current');

				setCurrentUser(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUser();
	}, []);

	return (
		<>
			<Head>
				<title>User | eLMS</title>
				<meta name='description' content='user | eLMS' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{currentUser && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
					}}
				>
					<pre>{JSON.stringify(currentUser, null, 4)}</pre>
				</div>
			)}
		</>
	);
};

export default UserIndex;
