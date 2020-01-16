import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { resetResult } from '../modules/clova';
import Result from '../components/Result';

function ResultContainer() {
    const clovaData = useSelector((state: RootState) => state.clova.data);

    const dispatch = useDispatch();

    const onReset = () => {
        dispatch(resetResult());
    }

    return <Result data={clovaData} onReset={onReset}/>
}

export default ResultContainer