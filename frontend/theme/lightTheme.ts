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
					boxShadow: 'none',
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
