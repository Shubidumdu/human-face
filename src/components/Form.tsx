import React from 'react';
import styled from './theme';
import facesample2 from './imgs/facesample2.png';

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
      margin-top: 2rem;
      border-radius: 1rem;
    `;

    return (
      <Form>
        <img alt='faceImg' src={src || facesample2} />
        <button onClick={onOpen}>모달!</button>
        <button onClick={onSubmit}>완료!</button>
      </Form>
    );
}

export default Form;