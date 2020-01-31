import React, { useCallback } from 'react';
import ReactCrop from "react-image-crop";
import styled, { ButtonTiny, ButtonLabel } from './theme';
import "react-image-crop/dist/ReactCrop.css";
import {MdFileUpload, MdClose, MdCheck} from 'react-icons/md';
import Modal from 'styled-react-modal'
import './css/modal.css';

export type ModalProps = {
    isOpen: boolean;
    onClose: (e: any) => void;
    src: string;
    onFileChange: (e: any) => void;
    crop: ReactCrop.Crop;
    onCropChange: (crop: ReactCrop.Crop, percentCrop: ReactCrop.PercentCrop) => void;
    setImageBlob: React.Dispatch<React.SetStateAction<Blob | undefined>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
    onSuccess: (e: any) => Promise<void>
    onImageLoaded: (image: any) => void
}

function CropModal({
    isOpen,
    onClose,
    src,
    onCropChange,
    onFileChange,
    crop,
    onImageLoaded,
    onSuccess
}: ModalProps) {
    
    const StyledModal = useCallback(Modal.styled`
        position: absolute;
        top: 50%;
        left: 50%;
        right: auto;
        bottom: auto;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        border: 1px solid #ccc;
        background: #FDFAE8;
        overflow: auto;
        border-radius: 1rem;
        outline: none;
        padding: 0 0.5rem;
    
        @media (max-width: 850px) {
            width: 100%;
            height: auto;
        }
        `
    , []);

    const CloseButton = useCallback(ButtonTiny, [onClose]);

    const CropWrapper = useCallback(styled.div`
        background: black;
        display: flex;
        border: 2px solid #000;
        align-items: center;
        justify-content: center;
    `
    , []);

    const BeforeCrop = useCallback(styled.div`
        display: flex;
        width: 52rem;
        height: 30rem;
        background: ${props => props.theme.color.darkbrown };
        color: #fff;
        border: 2px solid #000;
        font-size: 3rem;
        justify-content: center;
        align-items: center;

        @media (max-width: 850px) {
            width: 100%;
            height: 20rem;
            font-size: 1.5rem;
        }
    `, []);

    const ModalHeaderWrap = useCallback(styled.div`
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        @media (max-width: 850px) {
            height: 3rem;
        }
    `, []);

    const ModalTailWrap = useCallback(styled.div`
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        @media (max-width: 850px) {
            height: 3rem;
        }
    `, []);

    const InputHiding = useCallback(styled.input`
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    `, []);

    const InputLabel = useCallback(ButtonLabel, []);

    const SuccessButton = useCallback(ButtonTiny, []);

    return (
        <StyledModal
        isOpen={isOpen}
        onBackgroundClick={onClose}
        onEscapeKeydown={onClose}
        >
            <ModalHeaderWrap>
                <CloseButton 
                    onClick={onClose} 
                    color='red'>
                    <MdClose size='100%'/>
                </CloseButton>
            </ModalHeaderWrap>
            {src &&
                <CropWrapper>
                    <ReactCrop 
                        src={src} 
                        onChange={onCropChange} 
                        crop={crop} 
                        onImageLoaded={onImageLoaded}
                        />
                </CropWrapper>}
            {!src && 
                <BeforeCrop>
                    이미지 파일을 불러와주세요.
                </BeforeCrop>
            }
            <ModalTailWrap>
                <InputLabel htmlFor='imgInput' color='yellow'>
                    <MdFileUpload size='100%'/>
                </InputLabel>
                <InputHiding type='file' onChange={onFileChange} id='imgInput' accept="image/*"/>
                <SuccessButton onClick={onSuccess} color='green'>
                    <MdCheck size='100%'/>
                </SuccessButton>
            </ModalTailWrap>
        </StyledModal>
    );
}

export default CropModal;