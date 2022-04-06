import Link from 'next/link';
import AppDrawer from 'components/layout/AppDrawer';
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@mui/material';
import { DashboardCustomizeRounded } from '@mui/icons-material';

const UserNavigation: React.FC = () => {
	const drawerContent = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				<Link href='/user/dashboard' passHref>
					<a style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button key='1'>
							<ListItemIcon>
								<DashboardCustomizeRounded color='primary' />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItem>
					</a>
				</Link>
			</List>
		</div>
	);

	return <AppDrawer>{drawerContent}</AppDrawer>;
};

export default UserNavigation;
