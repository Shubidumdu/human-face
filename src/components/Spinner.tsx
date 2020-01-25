import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

type SpinnerProps = {
    isLoading: boolean;
}

function Spinner ({isLoading} : SpinnerProps) {
    
    return <Loader 
        visible={isLoading}
        type="Audio"
        color="#000"
        height={800}
        width={800}
    />
}

export default Spinner;