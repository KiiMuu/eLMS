import { createTheme } from '@mui/material/styles';

let lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#2ecc71',
			contrastText: '#fff',
		},
		secondary: {
			main: '#34495e',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
		fontSize: 14,
		htmlFontSize: 10,
	},
	components: {
		MuiCssBaseline: {
			// styleOverrides: `
			//     @font-face {
			//         font-family: 'Poppins, sans-serif';
			//     }
			// `,
			styleOverrides: `
			    @font-face {
			        font-family: 'Montserrat', 'Roboto', 'sans-serif';
			    }
			`,
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					background: '#fff',
					boxShadow: '1px 2px 3px rgb(0 0 0 / 11%)',
					zIndex: 99999,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'capitalize',
				},
			},
		},
	},
});

export default lightTheme;
