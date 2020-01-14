import React, {useState} from 'react';
import { clovaFace } from './api/clova';

function Form() {

  const [image, setImage] = useState();

  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  }
  
  const onSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    const celeb = await clovaFace('celeb', formData);
    const faceInfo = await clovaFace('face', formData);

    console.log(celeb);
    console.log(faceInfo);
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
