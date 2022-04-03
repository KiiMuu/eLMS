import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from 'state/store';
import lightTheme from 'theme/lightTheme';
import Navbar from 'components/layout/Navbar';
import { ThemeProvider } from '@mui/material';
import GlobalCSS from 'styles/Global';

function MyApp({ Component, pageProps }: AppProps) {
	let router = useRouter();

	axios.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			let res = error.response;

			if (
				res.status === 401 &&
				res.config &&
				!res.config.__isRetryRequest
			) {
				return new Promise((resolve, reject) => {
					axios
						.get('/api/auth/signout')
						.then(() => {
							console.log('/401 error > logout');
							window.localStorage.removeItem('elmsUser');
							router.push('/signin');
						})
						.catch(error => {
							console.log('Axios Interceptors Err', error);
							reject(error);
						});
				});
			}

			return Promise.reject(error);
		}
	);

	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axios.get('/api/csrf-token');

			// Include the CSRF token in all requests
			// @ts-ignore
			axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
		};

		getCsrfToken();
	}, []);

	return (
		<Provider store={store}>
			{GlobalCSS()}
			<ThemeProvider theme={lightTheme}>
				{router.pathname !== '/signin' &&
				router.pathname !== '/signup' ? (
					<Navbar />
				) : null}
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
