import React, { useState } from 'react';
import { clovaFace } from '../api/clova';
import { useDispatch } from 'react-redux';
import { getResultThunk } from '../modules/clova';
import Form from '../components/Form';
import CropModalContainer from './CropModalContainer';


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

        dispatch(getResultThunk(celeb, faceInfo, formData));
        setImageFile('');
      }

    const [isOpen, setModalOpen] = useState(false);

    const openModal = (e: any) => {
        e.preventDefault();
        setModalOpen(true)
    }

    const closeModal = (e: any) => {
        setModalOpen(false)
    }

    return (
      <>
      <Form imageURL={imageURL} onChange={onChange} onSubmit={onSubmit} onOpen={openModal}/>
      <CropModalContainer isOpen={isOpen} onClose={closeModal}/>
      </>
    )
  };

  export default FormContainer;