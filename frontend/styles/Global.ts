import { globalCss } from '@stitches/react';

const GlobalCSS = globalCss({
	':root': {
		'--mainColor': '#2ecc71',
		'--secondaryColor': '#34495e',
		'--br': '3px', // border-radius
		'--borderColor': '#f0ebeb',
		'--textGray': 'rgb(91, 112, 131)',
		'--navHeight': '64px',
		'--mobNavHeight': '56px',
	},
	html: {
		fontSize: '62.5%',
	},
	body: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
		boxSizing: 'border-box',
		scrollBehavior: 'smooth',
		fontSize: '1.6rem',
		padding: '0',
		margin: '0',
	},
	'&*, &*::before, &*::after': {
		boxSizing: 'inherit',
		padding: '0',
		margin: '0',
	},
});

export default GlobalCSS;
