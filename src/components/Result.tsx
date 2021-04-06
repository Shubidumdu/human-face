import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { MdRefresh, MdErrorOutline } from 'react-icons/md';
import { darken, lighten } from 'polished';
import { IoMdPeople } from 'react-icons/io';
import { ResultInfo } from './ResultContainer';

const WindowWrap = styled.section`
  display: flex;
  flex-direction: column;

  @media (max-width: 850px) {
    width: 97%;
  }

  @media (max-width: 426px) {
    margin-top: 0;
  }
`;

const ResultWrap = styled.section`
  background-color: ${({ theme }) => theme.color.ivory};
  width: 52rem;
  box-shadow: 4px 4px 4px ${({ theme }) => theme.color.grey};
  margin-top: 1rem;
  border-radius: 1rem;
  border: solid 2px ${({ theme }) => theme.color.darkbrown};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 850px) {
    width: 100%;
  }

  @media (max-width: 426px) {
    width: 100%;
    margin-top: 0;
    height: 98vh;
  }
`;

const ResultHead = styled.header`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  display: none;

  @media (max-width: 850px) {
    display: block;
  }

  @media (max-width: 426px) {
    margin-top: 0;
    font-size: 1.2rem;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

const ContentWrap = styled.section`
  width: 100%;
  height: 100%;
  display: flex;

  @media (max-width: 850px) {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const ErrorWrap = styled.section`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  line-height: 2;
  flex-direction: column;
  padding-bottom: 1rem;

  @media (max-width: 850px) {
    font-size: 0.8rem;
    height: 20rem;
  }
`;

const FaceImg = styled.img`
  margin: 2rem;
  border: 2px solid ${({ theme }) => theme.color.black};
  border-radius: 1rem;
  width: 20rem;
  height: auto;

  @media (max-width: 320px) {
    width: 95%;
  }

  @media (max-width: 426px) {
    height: 55%;
    width: auto;
    margin: 0;
  }
`;

const DescWrap = styled.main`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-direction: column;

  @media (max-width: 850px) {
    line-height: 2;
    margin-bottom: 2rem;
  }

  @media (max-width: 426px) {
    margin-bottom: 0;
  }
`;

const DescHeader = styled.header`
  width: 33%;
  text-align: center;
  align-self: flex-end;
  font-size: 1.5rem;

  @media (max-width: 426px) {
    font-size: 1rem;
  }
`;

const DescContent = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  font-size: 2rem;
`;

const Category = styled.span`
  font-size: 1.5rem;
  width: 33.3%;
  text-align: center;

  @media (max-width: 320px) {
    font-size: 1.3rem;
  }

  @media (max-width: 426px) {
    font-size: 1rem;
  }
`;

const Value = styled.span`
  font-size: 1.7rem;
  width: 33.3%;
  text-align: center;

  @media (max-width: 426px) {
    font-size: 1.3rem;
  }
`;

const Score = styled.span<{
  color: string;
}>`
  font-size: 2rem;
  width: 33.3%;
  text-align: center;

  @media (max-width: 426px) {
    font-size: 1.4rem;
  }

  ${({ color, theme }) => {
    const selected = theme.color[color];
    return css`
      color: ${selected};
    `;
  }};

  text-shadow: ${({ theme }) => {
    const black = theme.color.black;
    return `-1px 0 ${black}, 0 1px ${black}, 1px 0 ${black}, 0 -1px ${black};`;
  }};
`;

const Percentage = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.black};
  text-shadow: none;
`;

const ResetButton = styled.button`
  align-self: center;
  width: 5rem;
  height: 5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.color.darkbrown};
  box-shadow: 2px 2px 2px ${({ theme }) => theme.color.grey};
  background: ${({ theme }) => theme.color.yellow};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => lighten(0.1, theme.color.yellow)};
  }

  &:active {
    background: ${({ theme }) => darken(0.1, theme.color.yellow)};
    box-shadow: none;
  }
`;

interface ResultErrorProps {
  type: 'faceCount' | 'default';
}

const ResultError: React.FC<ResultErrorProps> = ({ type }) => {
  return (
    <ErrorWrap>
      <ResultHead>분석 결과</ResultHead>
      {type === 'faceCount' ? (
        <>
          <IoMdPeople size="10rem" />
          감지되는 얼굴이 너무 많습니다. <br />
          하나의 얼굴만 나오는 이미지로 다시 시도해주십시오.
        </>
      ) : (
        <>
          <MdErrorOutline size="10rem" />
          감지되는 얼굴이 존재하지 않거나 기타 오류가 발생했습니다.
          <br />
          다른 이미지를 사용하여 다시 시도 해주십시오.
        </>
      )}
    </ErrorWrap>
  );
};

interface DescItemProps {
  category: string;
  value: string;
  score: number;
  color: string;
}

const DescItem: React.FC<DescItemProps> = ({
  category,
  value,
  score,
  color,
}) => {
  return (
    <DescContent>
      <Category>{category}</Category>
      <Value>{value}</Value>
      <Score color={color}>
        {score}
        <Percentage>%</Percentage>
      </Score>
    </DescContent>
  );
};

type ResultProps = {
  faceCount: number;
  imageURL: string | null;
  resultInfo: ResultInfo;
  error: Error | null;
  onReset: () => void;
};

const Result: React.FC<ResultProps> = ({
  faceCount,
  imageURL,
  resultInfo,
  error,
  onReset,
}) => {
  const theme = useTheme();
  const { gender, celebrity, age, emotion } = resultInfo;
  console.log(faceCount);
  console.log(error);
  if (faceCount > 1)
    return (
      <WindowWrap>
        <ResultWrap>
          <ResultError type="faceCount" />
        </ResultWrap>
        <ResetButton onClick={onReset}>
          <MdRefresh size="4rem" color={theme.color.darkbrown} />
        </ResetButton>
      </WindowWrap>
    );
  if (faceCount === 0)
    return (
      <WindowWrap>
        <ResultWrap>
          <ResultError type="default" />
        </ResultWrap>
        <ResetButton onClick={onReset}>
          <MdRefresh size="4rem" color={theme.color.darkbrown} />
        </ResetButton>
      </WindowWrap>
    );
  return (
    <WindowWrap>
      <ResultWrap>
        <ContentWrap>
          <ResultHead>분석 결과</ResultHead>
          <FaceImg src={imageURL || undefined} alt="faceImg" />
          <DescWrap>
            <DescHeader>정확도</DescHeader>
            <DescItem
              category="성별"
              value={gender.value}
              score={gender.score}
              color={gender.color}
            />
            <DescItem
              category="나이"
              value={age.value + '세'}
              score={age.score}
              color={age.color}
            />
            <DescItem
              category="표정"
              value={emotion.value}
              score={emotion.score}
              color={emotion.color}
            />
            <DescItem
              category="닮은꼴"
              value={celebrity.value}
              score={celebrity.score}
              color={celebrity.color}
            />
          </DescWrap>
        </ContentWrap>
      </ResultWrap>
      <ResetButton onClick={onReset}>
        <MdRefresh size="4rem" color={theme.color.darkbrown} />
      </ResetButton>
    </WindowWrap>
  );
};

export default Result;
