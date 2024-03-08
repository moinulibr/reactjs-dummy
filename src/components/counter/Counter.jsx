import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/slices/counter/counterSlice';

const Counter = () => {
    const initialValue = useSelector((state) => state.counter.value );
    const dispatch = useDispatch();
    return (
        <div style={{ marginLeft:'300px',marginTop:'300xp' }}>
            <h3>{initialValue}</h3>
            <div>
                <button onClick={() => {dispatch(increment())}}>Increment</button>
                <button onClick={() => {dispatch(decrement())}}>Decrement</button>
            </div>
        </div>
    );
};

export default Counter;