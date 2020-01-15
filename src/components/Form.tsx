import React from 'react';

type FormProps = {
    imageURL: string;
    onChange: (e: any) => void;
    onSubmit: (e: any) => void;
}

function Form({
  imageURL,
    onChange,
    onSubmit
    }: FormProps) {
    return (
        <div className="form">
          <img src={imageURL} />
          <form>
            <input onChange={onChange} type="file" />
            <button onClick={onSubmit}>완료!</button>
          </form>
        </div>
    );
}

export default Form;