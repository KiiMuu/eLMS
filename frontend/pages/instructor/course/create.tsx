import { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';

const CourseCreate: NextPage = () => {
	return (
		<>
			<Head>
				<title>Course Creation</title>
				<meta name='Course Create' content='Create course @ eLMS' />
			</Head>
			<Box sx={{ mt: '100px' }}>Create Course</Box>
		</>
	);
};

export default CourseCreate;
