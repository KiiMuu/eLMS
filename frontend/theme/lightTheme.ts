import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#0EA5E9',
			contrastText: '#fff',
		},
		secondary: {
			main: '#252A34',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
		fontSize: 14,
		htmlFontSize: 10,
	},
	components: {
		// MuiScopedCssBaseline: {
		// 	styleOverrides: `
		//         @font-face {
		//             font-family: 'Poppins';
		//         }
		//     `,
		// },
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'unset',
				},
			},
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
