import React from 'react';

type FormProps = {
    imageURL: string;
    onChange: (e: any) => void;
    onSubmit: (e: any) => void;
    onOpen: (e: any) => void;
}

function Form({
  imageURL,
    onChange,
    onSubmit,
    onOpen
    }: FormProps) {
    return (
        <div className="form">
          <img alt='faceImg' src={imageURL} />
          <form>
            <input onChange={onChange} type="file" />
            <button onClick={onOpen}>모달!</button>
            <button onClick={onSubmit}>완료!</button>
          </form>
        </div>
    );
}

export default Form;