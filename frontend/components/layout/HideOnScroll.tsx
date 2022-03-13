import { Slide, SlideProps, useScrollTrigger } from '@mui/material';

const HideOnScroll: React.FC<SlideProps> = ({ children }) => {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
};

export default HideOnScroll;
