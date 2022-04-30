import { NextPage } from 'next';
import Head from 'next/head';
import InstructorRoute from 'components/routes/InstructorRoute';
import { Box } from '@mui/material';

const InstructorPage: NextPage = () => {
	return (
		<InstructorRoute>
			<Head>
				<title>Instructor | eLMS</title>
				<meta name='Instructor' content='Instructor' />
			</Head>
			<Box sx={{ mt: '100px' }}>InstructorPage</Box>
		</InstructorRoute>
	);
};

export default InstructorPage;
