import React from 'react';
import CropModal from '../components/CropModal';
import { ModalProps } from '../components/CropModal';

function CropModalContainer({
    isOpen,
    onClose
}: ModalProps) {
    return <CropModal isOpen={isOpen} onClose={onClose} />
}

export default CropModalContainer;