import React from 'react';

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

    return (
        <div className="form">
          <img alt='faceImg' src={src} />
          <form>
            <button onClick={onOpen}>모달!</button>
            <button onClick={onSubmit}>완료!</button>
          </form>
        </div>
    );
}

export default Form;