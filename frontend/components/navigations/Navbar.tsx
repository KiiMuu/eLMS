import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { signout } from 'state/auth/authApi';
import { handleDrawerToggle } from 'state/global';
import HideOnscroll from '../layout/HideOnScroll';
import MobileMenu from '../layout/MobileMenu';
import {
	AppBar,
	IconButton,
	MenuItem,
	Toolbar,
	Button,
	Avatar,
} from '@mui/material';
import { Box } from '@mui/system';
import { Menu } from '@mui/icons-material';

const navItemStyle = {
	display: {
		xs: 'none',
		sm: 'block',
	},
	textDecoration: 'none',
};

const Navbar: React.FC = () => {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const router = useRouter();
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const dispatch = useAppDispatch();
	const { signoutStatus, user } = useAppSelector(state => state.auth);

	const handleMobileMenuClose = useCallback(() => {
		setMobileMoreAnchorEl(null);
	}, []);

	const handleMobileMenuOpen = useCallback(e => {
		setMobileMoreAnchorEl(e.currentTarget);
	}, []);

	const handleMenuClose = useCallback(() => {
		handleMobileMenuClose();
	}, [handleMobileMenuClose]);

	const handleLogout = useCallback(() => {
		dispatch(signout());
		setMobileMoreAnchorEl(null);
		router.push('/signin');
	}, [dispatch, router]);

	const drawerToggle = useCallback(() => {
		dispatch(handleDrawerToggle());
	}, [dispatch]);

	useEffect(() => {
		if (signoutStatus === 'succeeded') {
			window.localStorage.removeItem('elmsUser');
		}
	}, [signoutStatus]);

	const renderNavItems = () => (
		<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
			<MenuItem>
				<Link href='/courses' passHref>
					<Button size='small' color='secondary' sx={navItemStyle}>
						Courses
					</Button>
				</Link>
			</MenuItem>
			{user?.role === 'instructor' ? (
				<MenuItem>
					<Link href='/instructor/course/create' passHref>
						<Button
							size='small'
							color='secondary'
							sx={navItemStyle}
						>
							Create Course
						</Button>
					</Link>
				</MenuItem>
			) : (
				<MenuItem>
					<Link href='/user/become-instructor' passHref>
						<Button
							size='small'
							color='secondary'
							sx={navItemStyle}
						>
							Be an Instructor
						</Button>
					</Link>
				</MenuItem>
			)}
			{!user && [
				<MenuItem key='1'>
					<Link href='/signup' passHref>
						<Button
							size='small'
							color='secondary'
							sx={navItemStyle}
						>
							Sign Up
						</Button>
					</Link>
				</MenuItem>,
				<MenuItem key='2'>
					<Link href='/signin' passHref>
						<Button
							size='small'
							color='secondary'
							sx={navItemStyle}
						>
							Sign In
						</Button>
					</Link>
				</MenuItem>,
			]}
			{user && [
				<MenuItem key='3'>
					<Link href='/user' passHref>
						<Button
							size='small'
							color='secondary'
							sx={navItemStyle}
						>
							Dashboard
						</Button>
					</Link>
				</MenuItem>,
				<MenuItem onClick={handleLogout} key='4'>
					<Button size='small' color='secondary' sx={navItemStyle}>
						Sign Out
					</Button>
				</MenuItem>,
			]}
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<HideOnscroll>
				<AppBar position='fixed' color='transparent'>
					<Toolbar>
						{router.pathname === '/user' && (
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								aria-label='menu'
								sx={{
									display: { md: 'none' },
								}}
								onClick={drawerToggle}
							>
								<Menu />
							</IconButton>
						)}
						<Link href='/' passHref>
							<Button
								size='large'
								color='secondary'
								sx={{
									textDecoration: 'none',
									fontSize: '20px',
								}}
							>
								<span style={{ textTransform: 'lowercase' }}>
									<i>e</i>
								</span>
								LMS
							</Button>
						</Link>
						<Box sx={{ flexGrow: 1 }} />
						{renderNavItems()}
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='show more'
								aria-controls='mobMenu'
								aria-haspopup='true'
								onClick={handleMobileMenuOpen}
								color='primary'
							>
								<Avatar
									alt='Remy Sharp'
									src='https://mui.com/static/images/avatar/2.jpg'
								/>
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
			</HideOnscroll>
			<MobileMenu
				mobileMoreAnchorEl={mobileMoreAnchorEl}
				isMobileMenuOpen={isMobileMenuOpen}
				handleMobileMenuClose={handleMobileMenuClose}
				user={user}
				handleMenuClose={handleMenuClose}
				handleLogout={handleLogout}
			/>
		</Box>
	);
};

export default Navbar;
