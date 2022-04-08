import { FC, ReactNode, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { handleDrawerToggle } from 'state/global';
import { Drawer } from '@mui/material';

const AppDrawer: FC<ReactNode> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { drawerOpen } = useAppSelector(state => state.global);

	const drawerToggle = useCallback(() => {
		dispatch(handleDrawerToggle());
	}, [dispatch]);

	return (
		<>
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
						width: 240,
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
						width: 240,
					},
				}}
				open
			>
				{children}
			</Drawer>
		</>
	);
};

export default AppDrawer;
