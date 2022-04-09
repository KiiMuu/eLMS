import { styled } from '@stitches/react';
import { orange, teal } from '@mui/material/colors';

export const UserLayoutStyle = styled('section', {
	display: 'flex',
	marginTop: '64px',
});

export const UserNavItems = styled('ul', {
	listStyle: 'none',
	padding: '10px 5px',
	'& a': {
		display: 'flex',
		alignItems: 'center',
		gap: '15px',
		padding: '10px',
		color: 'inherit',
		fontSize: '13px',
		textDecoration: 'none',
		textTransform: 'uppercase',
		transition: '.16s ease-in-out',
		'&:hover': {
			opacity: 0.75,
		},
	},
	'& .navItem': {
		borderRadius: 'var(--br)',
		'&:nth-of-type(1)': {
			background: teal[50],
			color: teal[500],
		},
		'&:nth-of-type(2)': {
			background: orange[50],
			color: orange[500],
		},
		'&:not(:last-of-type)': {
			marginBottom: '8px',
		},
	},
});
