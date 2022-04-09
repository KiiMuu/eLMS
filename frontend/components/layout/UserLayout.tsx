import { FC, ReactNode } from 'react';
import UserNavigation from 'components/navigations/UserNavigation';
import { Box } from '@mui/system';
import { UserLayoutStyle } from 'styles/user';

const UserLayout: FC<ReactNode> = ({ children }) => {
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
				<UserNavigation />
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
