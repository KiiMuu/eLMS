import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript,
} from 'next/document';
import { createStitches } from '@stitches/react';
export const { getCssText } = createStitches();

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	return() {
		<Html lang='en'>
			<Head>
				<meta charSet='utf-8' />
				<base href='/' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin=''
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;900&family=Roboto:wght@400;900&display=swap'
					rel='stylesheet'
				/>
				{/* <link rel='preconnect' href='https://fonts.gstatic.com' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap'
					rel='stylesheet'
					data-optimized-fonts='true'
				/>
				<style data-href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap' /> */}
				<style
					id='stitches'
					dangerouslySetInnerHTML={{ __html: getCssText() }}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>;
	}
}

export default MyDocument;
