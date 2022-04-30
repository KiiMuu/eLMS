import { FC, ReactNode } from 'react';
import { useAppSelector } from 'state/hooks';
import UserNavigation from 'components/navigations/UserNavigation';
import InstructorNavigation from 'components/navigations/InstructorNavigation';
import { Box } from '@mui/system';
import { UserLayoutStyle } from 'styles/user';

const UserLayout: FC<ReactNode> = ({ children }) => {
	const { user } = useAppSelector(state => state.auth);

	return (
		<UserLayoutStyle>
			<Box
				component='nav'
				sx={{
					width: { md: 240 },
					flexShrink: { md: 0 },
					background: 'red',
				}}
				aria-label='user sider'
			>
				{user?.role === 'instructor' ? (
					<InstructorNavigation />
				) : (
					<UserNavigation />
				)}
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
				}}
			>
				{children}
			</Box>
		</UserLayoutStyle>
	);
};

export default UserLayout;
