import { useAppSelector, useAppDispatch } from 'state/hooks';
import { decrement, increment } from 'state/counter/counterSlice';

const Counter = () => {
	const count = useAppSelector(state => state.counter.value);
	const dispatch = useAppDispatch();

	return (
		<div>
			<button onClick={() => dispatch(increment())}>+</button>
			<span>{count}</span>
			<button onClick={() => dispatch(decrement())}>-</button>
		</div>
	);
};

export default Counter;
