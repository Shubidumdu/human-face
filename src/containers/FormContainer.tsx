import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getResultThunk } from '../modules/clova';
import Form from '../components/Form';
import CropModalContainer from './CropModalContainer';
import { useAlert } from 'react-alert'


function FormContainer () {
    const dispatch = useDispatch();
    const alert = useAlert()

    const [imageBlob, setImageBlob] = useState<Blob>();
    const [imageUrl, setImageUrl] = useState('');

    const onSubmit = (e: any) => {
        if(!imageUrl) {
          alert.show('사진을 첨부하여 주십시오.')
          return;
        }

        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', imageBlob!);

        dispatch(getResultThunk(formData, imageUrl));
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