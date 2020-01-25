import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import styled from './theme';

type SpinnerProps = {
    isLoading: boolean;
}

function Spinner ({isLoading} : SpinnerProps) {

    const SpinnerWrap = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        position: fixed;
        background: rgb(0, 0, 0, 0.5);
        z-index: 10;
        justify-content: center;
        align-items: center;
    `;

    if (isLoading)
        return (
        <SpinnerWrap>
            <Loader 
                visible={isLoading}
                type="Oval"
                color="#F2B807"
                height={300}
                width={300}
            />
        </SpinnerWrap>);
    else return null;
}

export default Spinner;