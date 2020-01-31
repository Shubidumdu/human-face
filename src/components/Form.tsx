import React from 'react';
import styled, {ButtonBig} from './theme';
import facesample2 from './imgs/facesample2.png';
import titleImg from './imgs/title-medium2.png';
import { TiAttachmentOutline } from 'react-icons/ti';
import { FaCheck } from 'react-icons/fa';

type FormProps = {
    imageUrl: string;
    onSubmit: (e: any) => void;
    onOpen: (e: any) => void;
}

function Form({
    imageUrl,
    onSubmit,
    onOpen
    }: FormProps) {

    const src = imageUrl;

    const Form = styled.div`
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

      @media (max-width: 820px) {
        width: 100%;
      }
    `;

    const TitleImg = styled.img`
      margin-top: 2rem;
      width: 47rem;
      height: auto;

      @media (max-width: 820px) {
        width: 80%;
      }
    `;

    const FaceImg = styled.img`
      width: 26rem;
      height: auto;
      background: #000;
      border-radius: 1rem;
      border: 2.5px solid #000;
      margin-top: 2rem;

      @media (max-width: 820px) {
        width: 80%;
        height: auto;
        margin-top: 1rem;
      }
    `;

    const Desc = styled.h6`
      margin-top: 2rem;
      line-height: 1.5;
      text-align: center;
      font-size: 1.5rem;

      @media (max-width: 750px) {
        font-size: 0.875rem;
        line-height: 1.7;
      }
    `
    
    const ButtonWrapper = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 7rem;
        position: relative;
        justify-content: center;
    `

    return (
      <Form>
        <TitleImg src={titleImg}/>
        <Desc>
          분석하길 원하는 얼굴을 첨부하여 제출해주세요! <br />
          인간안면분석기가 AI를 통해 당신의 얼굴을 분석하여 <br />
          당신의 닮은꼴 유명인, 성별, 나이, 표정을 출력합니다.
        </Desc>
        <FaceImg alt='faceImg' src={src || facesample2} />
        <ButtonWrapper>
          <ButtonBig 
            onClick={onOpen} 
            color='yellow'>
            <TiAttachmentOutline size='3.5rem' color='black'/>
          </ButtonBig>
          <ButtonBig 
            onClick={onSubmit} 
            color='green' >
            <FaCheck size='3rem' color='black'/>
          </ButtonBig>
        </ButtonWrapper>
      </Form>
    );
} 

export default Form;