import React from 'react';
import { ClovaResult } from '../modules/clova';

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

    const celebrities = data.celebrity;
    const {value: gender, score: genderScore} = data.gender;
    const {value: age, score: ageScore} = data.age;
    const {value: emotion, score: emotionScore} = data.emotion;
    
    return (
        <div className="result">
            닮은 유명인 <br/>
            {
                celebrities.map((celeb, index) => {
                    return (<>이름: {celeb.value} 정확도: {celeb.score}<br/></>)
                })
            }
            성별 : {gender} 정확도: {genderScore} <br />
            나이 : {age} 정확도: {ageScore} <br />
            감정 : {emotion} 정확도: {emotionScore}
            <button onClick={onReset}>리셋!</button>
        </div>);
    }


export default Result;