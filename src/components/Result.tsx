import React from 'react';
import { ClovaResult } from '../modules/clova';
import styled from './theme';
import { css } from 'styled-components';
import { MdRefresh } from 'react-icons/md';
import { darken, lighten } from 'polished';

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
    
    const WindowWrap = styled.div`
        display: flex;
        flex-direction: column;
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
    `;

    const ResultHead = styled.h1`
        font-size: 1.5rem;
        margin-top: 1.5rem;
    `;

    const ContentWrap = styled.div`
        width: 100%;
        display: flex;
    `;

    const FaceImg = styled.img`
        margin: 2rem;
        border: 2px solid black;
        border-radius: 1rem;
        width: 20rem;
        height: auto;
    `;

    const DescWrap = styled.div`
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        flex-direction: column;
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
    `;

    const Value = styled.span`
        font-size: 1.7rem;
        width: 33.3%;
        text-align: center;
    `;

    const Score = styled.span`
        font-size: 2rem;
        width: 33.3%;
        text-align: center;

        ${props => {
            const color = props.color!
            const selected = props.theme.color[color];
            return css`
              color: ${selected};
              `;
            }};
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    `;

    const ResembleWrap = styled.span`
        display: flex;
        flex-direction: column;
        line-height: 1.4;
        width: 66%;
    `;

    const ResembleContent = styled.span`
        display: flex;
        width: 100%;
    `;

    const ResembleValue = styled.span`
        font-size: 1.7rem;
        text-align: center;
        width: 50%;
    `

    const ResembleScore = styled.span`
        text-align: center;
        width: 50%;
        ${props => {
            const color = props.color!
            const selected = props.theme.color[color];
            return css`
              color: ${selected};
              `;
            }};
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    `

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

    const celebrities = data.celebrity;
    const ImgUrl = data.imageInfo.url;
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

    return (
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
                            <ResembleWrap>
                                {
                                    celebrities.map((celeb, index) => {
                                        return (
                                        <ResembleContent key={index}>
                                            <ResembleValue>{celeb.value}</ResembleValue>
                                            <ResembleScore color={scoreColor(celeb.score)}>{celeb.score}
                                                <Percentage>%</Percentage>
                                            </ResembleScore>
                                        </ResembleContent>)
                                    })
                                }
                            </ResembleWrap>
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