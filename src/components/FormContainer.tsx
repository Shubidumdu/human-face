import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/Form';
import CropModalContainer from './CropModalContainer';
import { useAlert } from 'react-alert';
import { AppState } from '../modules/types';
import { getResultThunk } from '../modules/action';

function FormContainer() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const imageURL = useSelector((state: AppState) => state.imageURL) || '';
  const formData = useSelector((state: AppState) => state.formData);
  const [isOpen, setModalOpen] = useState(false);

  const onSubmit = () => {
    if (!formData) {
      alert.show('사진을 첨부하여 주십시오.');
      return;
    }
    dispatch(getResultThunk(formData));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Form imageURL={imageURL} onSubmit={onSubmit} onOpen={openModal} />
      <CropModalContainer isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

export default FormContainer;
