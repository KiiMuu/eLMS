import Link from 'next/link';
import { IMobileProps } from 'interfaces';
import { Menu, MenuItem, Button } from '@mui/material';
import {
	LoginOutlined,
	PersonAddAltOutlined,
	LogoutOutlined,
	DashboardCustomize,
	DashboardOutlined,
} from '@mui/icons-material';

const MobileMenu: React.FC<IMobileProps> = ({
	mobileMoreAnchorEl,
	isMobileMenuOpen,
	handleMobileMenuClose,
	user,
	handleMenuClose,
	handleLogout,
}) => {
	return (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'right',
			}}
			id='mobMenu'
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			sx={{ zIndex: 99999 }}
		>
			{!user && [
				<MenuItem onClick={handleMenuClose} key='1'>
					<Link href='/signup' passHref>
						<Button
							size='small'
							color='secondary'
							startIcon={
								<PersonAddAltOutlined fontSize='small' />
							}
						>
							Sign Up
						</Button>
					</Link>
				</MenuItem>,
				<MenuItem onClick={handleMenuClose} key='2'>
					<Link href='/signin' passHref>
						<Button
							size='small'
							color='secondary'
							startIcon={<LoginOutlined fontSize='small' />}
						>
							Sign In
						</Button>
					</Link>
				</MenuItem>,
			]}
			<MenuItem onClick={handleMenuClose} key='3'>
				<Link href='/courses' passHref>
					<Button
						size='small'
						color='secondary'
						startIcon={<DashboardCustomize fontSize='small' />}
					>
						All Courses
					</Button>
				</Link>
			</MenuItem>
			{user?.role === 'instructor' ? (
				<MenuItem key='4'>
					<Link href='/instructor/course/create' passHref>
						<Button
							size='small'
							color='secondary'
							startIcon={<DashboardCustomize fontSize='small' />}
						>
							Create Course
						</Button>
					</Link>
				</MenuItem>
			) : (
				<MenuItem key='5'>
					<Link href='/user/become-instructor' passHref>
						<Button
							size='small'
							color='secondary'
							startIcon={<DashboardCustomize fontSize='small' />}
						>
							Be an Instructor
						</Button>
					</Link>
				</MenuItem>
			)}
			{user && [
				<MenuItem key='6'>
					<Link href='/user' passHref>
						<Button
							size='small'
							color='secondary'
							startIcon={<DashboardOutlined fontSize='small' />}
						>
							Dashboard
						</Button>
					</Link>
				</MenuItem>,
				<MenuItem onClick={handleLogout} key='7'>
					<Button
						size='small'
						color='secondary'
						startIcon={<LogoutOutlined fontSize='small' />}
					>
						Sign Out
					</Button>
				</MenuItem>,
			]}
		</Menu>
	);
};

export default MobileMenu;
