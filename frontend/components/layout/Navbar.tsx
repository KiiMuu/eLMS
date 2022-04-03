import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { signout } from 'state/auth/authApi';
import HideOnscroll from './HideOnScroll';
import MobileMenu from './MobileMenu';
import {
	AppBar,
	IconButton,
	MenuItem,
	Toolbar,
	Button,
	Avatar,
} from '@mui/material';
import { Box } from '@mui/system';

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
					<Button
						size='small'
						color='secondary'
						sx={{
							display: {
								xs: 'none',
								sm: 'block',
							},
							textDecoration: 'none',
						}}
					>
						Courses
					</Button>
				</Link>
			</MenuItem>
			{!user && (
				<>
					<MenuItem>
						<Link href='/signup' passHref>
							<Button
								size='small'
								color='secondary'
								sx={{
									display: {
										xs: 'none',
										sm: 'block',
									},
									textDecoration: 'none',
								}}
							>
								Sign Up
							</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Link href='/signin' passHref>
							<Button
								size='small'
								color='secondary'
								sx={{
									display: {
										xs: 'none',
										sm: 'block',
									},
									textDecoration: 'none',
								}}
							>
								Sign In
							</Button>
						</Link>
					</MenuItem>
				</>
			)}
			{user && (
				<MenuItem onClick={handleLogout}>
					<Button
						size='small'
						color='secondary'
						sx={{
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
					>
						Sign Out
					</Button>
				</MenuItem>
			)}
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<HideOnscroll>
				<AppBar position='fixed' color='transparent'>
					<Toolbar>
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
