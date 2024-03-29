import Link from 'next/link';
import AppDrawer from 'components/layout/AppDrawer';
import { UserNavItems } from 'styles/user';
import { Theme, useMediaQuery } from '@mui/material';
import {
	DashboardCustomizeRounded,
	DashboardCustomizeTwoTone,
} from '@mui/icons-material';
import { orange, teal, blue } from '@mui/material/colors';

const UserNavigation: React.FC = () => {
	let arrOfItems = [
		{
			flag: 'Dashboard',
			to: '/user/dashboard',
			icon: (
				<DashboardCustomizeRounded
					fontSize='small'
					htmlColor={teal[500]}
				/>
			),
		},
		{
			flag: 'Dashboard1',
			to: '/user/dashboard1',
			icon: (
				<DashboardCustomizeTwoTone
					fontSize='small'
					htmlColor={orange[500]}
				/>
			),
		},
		{
			flag: 'Dashboard2',
			to: '/user/dashboard2',
			icon: (
				<DashboardCustomizeTwoTone
					fontSize='small'
					htmlColor={blue[500]}
				/>
			),
		},
	];

	const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

	const drawerContent = (
		<UserNavItems style={{ marginTop: md ? 70 : 15 }}>
			{arrOfItems.map((item, i) => (
				<li className='navItem' key={i}>
					<Link href={item.to} passHref>
						<a>
							{item.icon}
							{item.flag}
						</a>
					</Link>
				</li>
			))}
		</UserNavItems>
	);

	return <AppDrawer>{drawerContent}</AppDrawer>;
};

export default UserNavigation;
