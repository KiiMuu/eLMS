import { FC, ReactNode, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { handleDrawerToggle } from 'state/global';
import { Drawer, Box } from '@mui/material';

const drawerWidth = 240;

const AppDrawer: FC<ReactNode> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { drawerOpen } = useAppSelector(state => state.global);

	const drawerToggle = useCallback(() => {
		dispatch(handleDrawerToggle());
	}, [dispatch]);

	return (
		<Box
			component='nav'
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			aria-label='user sider'
		>
			<Drawer
				variant='temporary'
				open={drawerOpen}
				onClose={drawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
			>
				{children}
			</Drawer>
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
				open
			>
				{children}
			</Drawer>
		</Box>
	);
};

export default AppDrawer;
