import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Result from './Result';
import { resetResult } from '../modules/action';
import { AppState, Score } from '../modules/types';

export interface ResultInfo {
  [key: string]: {
    value: string;
    score: number;
    color: string;
  };
}

const genderMap: {
  [gender: string]: string;
} = {
  male: '남',
  female: '여',
};

const emotionMap: {
  [emotion: string]: string;
} = {
  angry: '화남',
  disgust: '혐오감',
  fear: '공포',
  laugh: '웃음',
  neutral: '무표정',
  sad: '슬픔',
  surprise: '놀람',
  smile: '미소',
  talking: '대화중',
};

const getScoreColor = (score: number): string => {
  if (score <= 30) return 'green';
  else if (score <= 70) return 'yellow';
  else return 'red';
};

const ResultContainer: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: AppState) => state.error);
  const imageURL = useSelector((state: AppState) => state.imageURL);
  const result = useSelector((state: AppState) => state.result);
  const onReset = () => {
    dispatch(resetResult());
  };

  if (!result) return null;

  const { faceCount, ...scores } = result;
  const resultInfo: ResultInfo = {};
  Object.entries(scores).forEach(([key, resultScore]: [string, Score]) => {
    const { value, score } = resultScore;
    const color = getScoreColor(score);
    if (key === 'gender') {
      resultInfo[key] = { value: genderMap[value], score, color };
      return;
    }
    if (key === 'emotion') {
      resultInfo[key] = { value: emotionMap[value], score, color };
      return;
    }
    resultInfo[key] = { value, score, color };
  });

  return (
    <Result
      imageURL={imageURL}
      faceCount={faceCount}
      resultInfo={resultInfo}
      error={error}
      onReset={onReset}
    />
  );
};

export default ResultContainer;
