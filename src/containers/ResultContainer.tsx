import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { resetResult } from '../modules/clova';

function ResultContainer() {
    const [celeb, faceInfo] = useSelector((state: RootState) => [state.clova.celeb, state.clova.face]);
    const dispatch = useDispatch();

    const onReset = () => {
        dispatch(resetResult());
    }

    return <></>
}

export default ResultContainer