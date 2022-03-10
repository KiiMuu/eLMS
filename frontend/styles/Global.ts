import { globalCss } from '@stitches/react';

const GlobalCSS = globalCss({
	':root': {
		'--mainColor': '#F71E35',
		'--secondaryColor': '#1794A5',
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
		boxSizing: 'border-box',
		fontFamily: ['Poppins', 'sans-serif'].join(','),
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
