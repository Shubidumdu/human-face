import React from 'react';
import styled from './theme';
import { css } from 'styled-components';
import facesample2 from './imgs/facesample2.png';
import titleImg from './imgs/title-medium2.png';
import { TiAttachmentOutline } from 'react-icons/ti';
import { FaCheck } from 'react-icons/fa';
import { darken, lighten } from 'polished';

type FormProps = {
    imageUrl: string;
    onSubmit: (e: any) => Promise<void>;
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
    `;

    const TitleImg = styled.img`
      margin-top: 2rem;
      width: 47rem;
      height: auto;
    `;

    const FaceImg = styled.img`
      width: 26rem;
      height: auto;
      background: #000;
      border-radius: 1rem;
      border: 2.5px solid #000;
      margin-top: 2rem;
    `;

    const Desc = styled.h6`
      margin-top: 2rem;
      line-height: 1.5;
      text-align: center;
      font-size: 1.5rem;
    `
    const Button = styled.button`
      width: 10rem;
      height: 5rem;
      border-radius: 1rem;
      border: 2px solid black;
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-family: yangjin;

      ${props => {
        const color = props.color!
        const selected = props.theme.color[color];
        return css`
          background: ${selected};
          &:hover {
            background: ${lighten(0.1, selected)};
          }
          &:active {
            background: ${darken(0.1, selected)};
          }
          `;
        }};
    `
    
    const ButtonWrapper = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 7rem;
        position: relative;
        justify-content: flex-start;
    `

    return (
      <Form>
        <TitleImg src={titleImg}/>
        <Desc>
          분석하길 원하는 얼굴을 첨부하여 제출해주세요! <br />
          인간안면분석기가 AI를 통해 당신의 얼굴을 분석합니다. <br />
          이를 통해 당신의 닮은꼴 연예인, 성별, 나이, 감정을 추측해냅니다.
        </Desc>
        <FaceImg alt='faceImg' src={src || facesample2} />
        <ButtonWrapper>
          <Button 
            onClick={onOpen} 
            color='yellow'
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
            <TiAttachmentOutline size='3.5rem' color='black'/>
          </Button>
          <Button onClick={onSubmit} 
            color='green' 
            style={{
              position: 'absolute',
              right: '1rem',
            }}>
            <FaCheck size='3rem' color='black'/>
          </Button>
        </ButtonWrapper>
      </Form>
    );
}

export default Form;