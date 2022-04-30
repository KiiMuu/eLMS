import Link from 'next/link';
import AppDrawer from 'components/layout/AppDrawer';
import { UserNavItems } from 'styles/user';
import { Theme, useMediaQuery } from '@mui/material';
import {
	DashboardCustomizeRounded,
	DashboardCustomizeTwoTone,
} from '@mui/icons-material';
import { orange, teal } from '@mui/material/colors';

const InstructorNavigation: React.FC = () => {
	let arrOfItems = [
		{
			flag: 'Dashboard',
			to: '/instructor',
			icon: (
				<DashboardCustomizeRounded
					fontSize='small'
					htmlColor={teal[500]}
				/>
			),
		},
		{
			flag: 'Create Course',
			to: '/instructor/course/create',
			icon: (
				<DashboardCustomizeTwoTone
					fontSize='small'
					htmlColor={orange[500]}
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

export default InstructorNavigation;
