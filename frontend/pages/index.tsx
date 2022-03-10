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
				<link rel='icon' href='/favicon.ico' />
			</Head>
		</>
	);
};

export default Home;
