import React, { useState } from 'react';
import { clovaFace } from '../api/clova';
import { useDispatch } from 'react-redux';
import { getResultThunk } from '../modules/clova';
import Form from '../components/Form';
import CropModalContainer from './CropModalContainer';


function FormContainer () {
    const dispatch = useDispatch();

    const [imageBlob, setImageBlob] = useState<Blob>();
    const [imageUrl, setImageUrl] = useState('');

    const onSubmit = async (e: any) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', imageBlob!);

        const celeb = await clovaFace('celeb', formData);
        const faceInfo = await clovaFace('face', formData);

        dispatch(getResultThunk(celeb, faceInfo, formData));
        setImageBlob(undefined);
      }

    const [isOpen, setModalOpen] = useState(false);

    const openModal = (e: any) => {
        e.preventDefault();
        setModalOpen(true)
    }

    const closeModal = (e: any) => {
        e.preventDefault();
        setModalOpen(false)
    }

    return (
      <>
      <Form imageUrl={imageUrl} onSubmit={onSubmit} onOpen={openModal}/>
      <CropModalContainer 
        isOpen={isOpen} 
        onClose={closeModal} 
        setImageUrl={setImageUrl}
        setImageBlob={setImageBlob}
      />
      </>
    )
  };

  export default FormContainer;