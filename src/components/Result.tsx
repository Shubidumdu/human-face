import React from 'react';
import { ClovaResult } from '../modules/clova';
import Spinner from './Spinner';

type ResultProps = {
    data: ClovaResult;
    onReset: () => void;
    isLoading: boolean;
    isError: boolean;
}

function Result({
    data,
    onReset,
    isLoading,
    isError
    }: ResultProps) {

    const {name: celebName, score: celebScore} = data.celebrity;
    const {value: gender, score: genderScore} = data.gender;
    const {value: age, score: ageScore} = data.age;
    const {value: emotion, score: emotionScore} = data.emotion;

    if(isLoading) return <Spinner isLoading={isLoading} />
    else if(data.imageInfo.faceCount !== (-1 || 0)) 
        {
            return (
                <div className="result">
                    닮은 연예인: {celebName} 정확도: {celebScore} <br/>
                    성별 : {gender} 정확도: {genderScore} <br />
                    나이 : {age} 정확도: {ageScore} <br />
                    감정 : {emotion} 정확도: {emotionScore}
                    <button onClick={onReset}>리셋!</button>
                </div>
            );
        }
    else return <Spinner isLoading={isLoading}/>

}

export default Result;