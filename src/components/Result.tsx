import React from 'react';
import { ClovaResult } from '../modules/clova';
import styled from './theme';
import { css } from 'styled-components';
import { MdRefresh, MdErrorOutline } from 'react-icons/md';
import { darken, lighten } from 'polished';
import {IoMdPeople} from 'react-icons/io';

type ResultProps = {
    data: ClovaResult;
    onReset: () => void;
    isError: boolean;
}

function Result({
    data,
    onReset,
    isError
    }: ResultProps) {
    
    const WindowWrap = styled.div`
        display: flex;
        flex-direction: column;

        @media (max-width: 850px) {
            width: 100%;
        }
    `

    const ResultWrap = styled.div`
        background-color: ${props => props.theme.color.ivory};
        width: 52rem;
        box-shadow: 4px 4px 4px grey;
        margin-top: 1rem;
        border-radius: 1rem;
        border: solid 2px ${props => props.theme.color.darkbrown};
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        @media (max-width: 850px) {
            width: 100%;
        }
    `;

    const ResultHead = styled.h1`
        font-size: 1.5rem;
        margin-top: 1.5rem;
    `;

    const ContentWrap = styled.div`
        width: 100%;
        display: flex;
        
        @media (max-width: 850px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `;

    const ErrorWrap = styled.div`
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
        border: 2px solid black;
        border-radius: 1rem;
        width: 20rem;
        height: auto;

        @media (max-width: 320px) {
            width: 95%;
        }
    `;

    const DescWrap = styled.div`
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        flex-direction: column;

        @media (max-width: 850px) {
            line-height: 2;
            margin-bottom: 2rem;
        }
    `
    
    const DescHeader = styled.div`
        width: 33%;
        text-align: center;
        align-self: flex-end;
        font-size: 1.5rem;
    `;

    const DescContent = styled.div`
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
    `;

    const Value = styled.span`
        font-size: 1.7rem;
        width: 33.3%;
        text-align: center;

        @media (max-width: 320px) {
            font-size: 1.5rem;
        }
    `;

    const Score = styled.span`
        font-size: 2rem;
        width: 33.3%;
        text-align: center;

        @media (max-width: 320px) {
            font-size: 1.9rem;
        }

        ${props => {
            const color = props.color!
            const selected = props.theme.color[color];
            return css`
              color: ${selected};
              `;
            }};
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    `;

    const Percentage = styled.span`
        font-size: 1rem;
        color: #000;
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
        border: 2px solid ${props => props.theme.color.darkbrown };
        box-shadow: 2px 2px 2px grey;
        background: ${props => props.theme.color.yellow };
        cursor: pointer;
        &:hover {
            background: ${props => lighten(0.1, props.theme.color.yellow)};
          }

        &:active {
            background: ${props => darken(0.1, props.theme.color.yellow)};
            box-shadow: none;
        }
    `
    const ImgUrl = data.imageInfo.url;
    const faceCount = data.imageInfo.faceCount;
    const {value: celebrity, score: celebrityScore} = data.celebrity;
    const {value: gender, score: genderScore} = data.gender;
    const {value: age, score: ageScore} = data.age;
    const {value: emotion, score: emotionScore} = data.emotion;
    
    const genderObj: {[key: string]: string} = {
        male: '남',
        female: '여'
    }

    const emotionObj: {[key: string]: string} = {
        angry: '화남',
        disgust: '혐오감',
        fear: '공포',
        laugh: '웃음',
        neutral: '무표정',
        sad: '슬픔',
        surprise: '놀람',
        smile: '미소',
        talking: '대화중'
    }

    const scoreColor = (score: number): string => {
        if(score <= 30) return 'green';
        else if (score <= 70) return 'yellow';
        else return 'red';
    }

    if(faceCount > 1)
        return (
            <WindowWrap>
                <ResultWrap>
                    <ResultHead>분석 결과</ResultHead>
                    <ErrorWrap>
                        <IoMdPeople size="10rem"/>
                        감지되는 얼굴이 너무 많습니다. <br/>
                        하나의 얼굴만 나오는 이미지로 다시 시도해주십시오.
                    </ErrorWrap>
                </ResultWrap>
                <ResetButton onClick={onReset}>
                    <MdRefresh size='4rem' color="#593E2E"/>
                </ResetButton>
            </WindowWrap>
        )
    
    else if(isError)
        return (
            <WindowWrap>
                <ResultWrap>
                    <ResultHead>분석 결과</ResultHead>
                    <ErrorWrap>
                        <MdErrorOutline size="10rem"/>
                        감지되는 얼굴이 존재하지 않거나 기타 오류가 발생했습니다.<br/>
                        다른 이미지를 사용하여 다시 시도 해주십시오.
                    </ErrorWrap>
                </ResultWrap>
                <ResetButton onClick={onReset}>
                    <MdRefresh size='4rem' color="#593E2E"/>
                </ResetButton>
            </WindowWrap>
        )

    else return (
        <WindowWrap>
            <ResultWrap>
                <ResultHead>분석 결과</ResultHead>
                <ContentWrap>
                <FaceImg src={ImgUrl} alt='faceImg' />
                    <DescWrap>
                        <DescHeader>정확도</DescHeader>
                        <DescContent>
                            <Category>성별</Category>
                            <Value>{genderObj[gender]}</Value>
                            <Score color={scoreColor(genderScore)}>{genderScore}
                                <Percentage>%</Percentage>
                            </Score>
                        </DescContent>
                        <DescContent>
                            <Category>나이</Category>
                            <Value>{age}
                                <Percentage>세</Percentage>
                            </Value>
                            <Score color={scoreColor(ageScore)}>{ageScore}
                                <Percentage>%</Percentage>
                            </Score>
                        </DescContent>
                        <DescContent>
                            <Category>표정</Category>
                            <Value>{emotionObj[emotion]}</Value>
                            <Score color={scoreColor(emotionScore)}>{emotionScore}
                                <Percentage>%</Percentage>
                            </Score>
                        </DescContent>
                        <DescContent>
                            <Category>닮은꼴</Category>
                            <Value>{celebrity}</Value>
                            <Score color={scoreColor(celebrityScore)}>{celebrityScore}
                                <Percentage>%</Percentage>
                            </Score>
                        </DescContent>
                    </DescWrap>
                </ContentWrap>
            </ResultWrap>
            <ResetButton onClick={onReset}>
                <MdRefresh size='4rem' color="#593E2E"/>
            </ResetButton>
        </WindowWrap>
        );
    }


export default Result;