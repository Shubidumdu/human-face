import React, {useState} from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export type ModalProps = {
    isOpen: boolean;
    onClose: (e: any) => void;
}

function CropModal({
    isOpen,
    onClose
}: ModalProps) {
    return (
        <div>
            <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Example Modal"
            >
            <button onClick={onClose}>close</button>
            <div>I am a modal</div>
            </Modal>
        </div>
    );
}

export default CropModal;