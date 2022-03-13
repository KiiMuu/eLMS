import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
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
		fontFamily: 'Poppins, sans-serif',
		fontSize: 14,
		htmlFontSize: 10,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			    @font-face {
			        font-family: 'Poppins';
			    }
			`,
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: '1px 2px 3px rgb(0 0 0 / 13%)',
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
