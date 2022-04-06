import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';
import UserNavigation from 'components/navigations/UserNavigation';

const UserLayout: FC<ReactNode> = ({ children }) => {
	return (
		<Grid container spacing={[2, 2]}>
			<Grid item sm={2}>
				<UserNavigation />
			</Grid>
			<Grid item sm={10}>
				{children}
			</Grid>
		</Grid>
	);
};

export default UserLayout;
