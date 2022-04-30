import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'state/hooks';
import Spin from '../layout/Spin';
import { Box } from '@mui/material';

const InstructorRoute: FC<ReactNode> = ({ children }) => {
	const { user } = useAppSelector(state => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/signin');
		} else if (user.role !== 'instructor') {
			router.push('/');
		}
	}, [user, router]);

	return (
		<>
			{!user ? (
				<Box sx={{ height: '100vh' }}>
					<Spin size={30} />
				</Box>
			) : (
				children
			)}
		</>
	);
};

export default InstructorRoute;
