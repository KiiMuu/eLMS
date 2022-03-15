import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';

const UserIndex: NextPage = () => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await axios.get(
					`${process.env.NEXT_PUBLIC_API}/auth/current`
				);

				setCurrentUser(data);

				console.log({ data });
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
		</>
	);
};

export default UserIndex;
