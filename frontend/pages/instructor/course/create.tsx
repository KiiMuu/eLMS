import { useState, useEffect, ChangeEvent } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import InstructorRoute from 'components/routes/InstructorRoute';
import {
	Box,
	Container,
	Typography,
	FormControl,
	TextField,
} from '@mui/material';

const CourseCreate: NextPage = () => {
	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '9.99',
		uploading: false,
		paid: true,
		loading: false,
		imagePreview: '',
	});

	const { name, description, price, uploading, paid, loading, imagePreview } =
		values;

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleImage = () => {};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.table(values);
	};

	const createCourseForm = () => (
		<form onSubmit={handleSubmit}>
			<FormControl sx={{ mt: 2 }} fullWidth>
				<TextField
					label='Name'
					variant='outlined'
					placeholder='Type course name'
					value={name}
					onChange={handleChange}
				/>
			</FormControl>
		</form>
	);

	return (
		<InstructorRoute>
			<Head>
				<title>Create Course | eLMS</title>
				<meta name='Course Create' content='Create course @ eLMS' />
			</Head>
			<Container maxWidth='xl'>
				<Box sx={{ mt: 'calc(var(--navHeight) + 20px)' }}>
					<Typography fontWeight={'bold'} variant='h3'>
						Create Course
					</Typography>
					<Typography variant='subtitle2' color='secondary'>
						Courses you created will be listed in your dashboard.
					</Typography>
					{createCourseForm()}
				</Box>
			</Container>
		</InstructorRoute>
	);
};

export default CourseCreate;
