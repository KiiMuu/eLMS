import { styled } from '@stitches/react';
import { alignItemsVerticallyHorizontally } from 'theme/mixins';

export const AuthWrapper = styled('section', alignItemsVerticallyHorizontally, {
	variants: {
		route: {
			signup: {
				backgroundImage:
					'linear-gradient(to left, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.25)), url(img/auth/undraw_signup.svg)',
			},
			signin: {
				backgroundImage:
					'linear-gradient(to left, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.75)), url(img/auth/undraw_signin.svg)',
			},
		},
	},
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'contain',
	backgroundPosition: 'center',
	backgroundAttachment: 'fixed',
	'& .form': {
		height: '100vh',
		backgroundImage:
			'linear-gradient(to right, rgba(255, 255, 255, 0.81), rgba(255, 255, 255, 0.78))',
		'& .formContent': {
			padding: '50px 10px 10px 10px',
		},
		borderLeft: '3px solid rgba(46, 204, 113, .15)',
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

export const ResetPasswordWrapper = styled(
	'section',
	alignItemsVerticallyHorizontally,
	{
		flexDirection: 'column',
		height: '100vh',
	},
	{
		'& .form': {
			// background:
			// 	'linear-gradient(to right, rgba(46, 204, 113, .24), rgba(255, 255, 255, 1))',
			// borderRadius: '4px',
			// padding: '10px',
			// border: '2px solid rgba(46, 204, 113, .24)',
			// boxShadow: '1px 2px 6px 1px rgb(0 0 0 / 15%)',
		},
	}
);
