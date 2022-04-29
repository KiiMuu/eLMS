import { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';

const InstructorPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Instructor | eLMS</title>
				<meta name='Instructor' content='Instructor' />
			</Head>
			<Box sx={{ mt: '100px' }}>InstructorPage</Box>
		</>
	);
};

export default InstructorPage;
