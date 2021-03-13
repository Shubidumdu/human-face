import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { resetResult, ClovaResult } from '../modules/clova';
import Result from '../components/Result';

type ResultContainerProps = {
    clovaData: ClovaResult
}

function ResultContainer({clovaData}: ResultContainerProps) {
    const isError = useSelector((state: RootState) => state.clova.error)? true : false;

    const dispatch = useDispatch();

    const onReset = () => {
        dispatch(resetResult());
    }

    return <Result data={clovaData} isError={isError} onReset={onReset}/>
}

export default ResultContainer