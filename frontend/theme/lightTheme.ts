import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#F71E35',
			contrastText: '#fff',
		},
		secondary: {
			main: '#1794A5',
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
