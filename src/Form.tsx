import React, {useState} from 'react';
import axios from 'axios';

function Form() {

  const [image, setImage] = useState();

  const onChange = (e: any) => {
    setImage(e.target.files[0]);
  }
  
  const onSubmit = (e: any) => {
    e.preventDefault();

    const url = '/api/celeb';
    const url2 = '/api/face';

    const formData = new FormData();
    formData.append('image', image);

    const result = axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })    
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });

    const result2 = axios.post(url2, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })    
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });
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
