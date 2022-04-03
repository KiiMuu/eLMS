import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home | eLMS</title>
				<meta
					name='description'
					content='Learn anything, On your schedule | eLMS'
				/>
			</Head>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<h1 style={{ fontSize: '66px' }}>Homepage</h1>
			</div>
		</>
	);
};

export default Home;
