import React, {useState} from 'react';
import axios from 'axios';

function Form() {

  const [image, setImage] = useState();

  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  }
  
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(image);
  }

    return (
        <div className="form">
          <form>
            <input onChange={onChange} type="file" />
            <button onClick={onSubmit}>완료!</button>
          </form>
        </div>
    )
}

export default Form;
