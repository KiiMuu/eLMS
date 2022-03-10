import { styled } from '@stitches/react';
import { alignItemsVerticallyHorizontally } from 'theme/mixins';

export const AuthWrapper = styled('section', alignItemsVerticallyHorizontally, {
	backgroundImage:
		'linear-gradient(to left, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.25)), url(img/auth/undraw_signup.svg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'contain',
	backgroundPosition: 'center',
	backgroundAttachment: 'fixed',
	'& .form': {
		height: '100vh',
		backgroundImage:
			'linear-gradient(to right, rgba(255, 255, 255, 0.71), rgba(255, 255, 255, 0.58))',
		'& .formContent': {
			padding: '50px 10px 10px 10px',
		},
	},
	'& .heading': {
		height: '100vh',
		'& .headingContent': {
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
		},
	},
});
