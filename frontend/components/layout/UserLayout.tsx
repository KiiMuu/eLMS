import { FC, ReactNode } from 'react';
import UserNavigation from 'components/navigations/UserNavigation';
import { Box } from '@mui/system';

const UserLayout: FC<ReactNode> = ({ children }) => {
	return (
		<Box sx={{ display: 'flex' }}>
			<Box
				component='nav'
				sx={{
					width: { sm: 240 },
					flexShrink: { sm: 0 },
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
					width: { sm: `calc(100% - 240px)` },
					background: 'green',
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default UserLayout;
