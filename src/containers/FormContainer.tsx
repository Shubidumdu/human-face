import React, { useState } from 'react';
import { clovaFace } from '../api/clova';
import { useDispatch } from 'react-redux';
import { getResult } from '../modules/clova';
import Form from '../components/Form';

function FormContainer () {
    const dispatch = useDispatch();

    const [imageFile, setImageFile] = useState('');
    const [imageURL, setImageURL] = useState('');

    const onChange = (e: any) => {
        setImageFile(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', imageFile);

        const celeb = await clovaFace('celeb', formData);
        const faceInfo = await clovaFace('face', formData);

        dispatch(getResult(celeb, faceInfo));
        setImageFile('');
      }

    return (
        <Form imageURL={imageURL} onChange={onChange} onSubmit={onSubmit}/>
    )
  };

  export default FormContainer;