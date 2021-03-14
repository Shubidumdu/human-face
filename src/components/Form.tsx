import React from 'react';
import facesample2 from '../imgs/facesample2.png';
import titleImg from '../imgs/title-medium2.png';
import { TiAttachmentOutline } from 'react-icons/ti';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import Button from './Button';

const FormWrap = styled.div`
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

  @media (max-width: 820px) {
    width: 97%;
  }

  @media (max-width: 426px) {
    margin-top: 0;
    height: 97vh;
    width: 100%;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
`;

const TitleImg = styled.img`
  margin-top: 2rem;
  width: 47rem;
  height: auto;

  @media (max-width: 820px) {
    width: 80%;
  }

  @media (max-width: 426px) {
    margin-top: 0;
  }
`;

const FaceImg = styled.img`
  width: 26rem;
  height: auto;
  background: ${({ theme }) => theme.color.black};
  border-radius: 1rem;
  border: 2.5px solid ${({ theme }) => theme.color.black};
  margin-top: 2rem;

  @media (max-width: 820px) {
    width: 80%;
    height: auto;
    margin-top: 1rem;
  }

  @media (max-width: 426px) {
    height: 55%;
    width: auto;
    margin-top: 0;
  }
`;

const Desc = styled.h6`
  margin-top: 2rem;
  line-height: 1.5;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 750px) {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  @media (max-width: 426px) {
    margin-top: 0;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    line-height: 1.7;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 7rem;
  position: relative;
  justify-content: center;

  @media (max-width: 426px) {
    height: 50%;
    align-items: center;
  }
`;

type FormProps = {
  imageURL: string;
  onSubmit: () => void;
  onOpen: () => void;
};

function Form({ imageURL, onSubmit, onOpen }: FormProps) {
  return (
    <FormWrap>
      <TitleWrap>
        <TitleImg alt="인간안면보고서" src={titleImg} />
        <Desc>
          분석하길 원하는 얼굴을 첨부하여 제출해주세요! <br />
          인간안면분석기가 AI를 통해 당신의 얼굴을 분석하여 <br />
          당신의 닮은꼴 유명인, 성별, 나이, 표정을 출력합니다.
        </Desc>
      </TitleWrap>
      <FaceImg alt="faceImg" src={imageURL || facesample2} />
      <ButtonWrapper>
        <Button size="big" type="button" onClick={onOpen} color="yellow">
          <TiAttachmentOutline size="90%" color="black" />
        </Button>
        <Button size="big" type="button" onClick={onSubmit} color="green">
          <FaCheck size="80%" color="black" />
        </Button>
      </ButtonWrapper>
    </FormWrap>
  );
}

export default Form;
