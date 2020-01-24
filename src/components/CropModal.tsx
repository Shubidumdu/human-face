import React, { useCallback } from 'react';
import Modal from 'react-modal';
import ReactCrop from "react-image-crop";
import styled from './theme';
import "react-image-crop/dist/ReactCrop.css";
import {MdClose} from 'react-icons/md';
import {FaFileUpload, FaCheck} from 'react-icons/fa';
import { css } from 'styled-components';
import { darken, lighten } from 'polished';


const ModalStyles:Modal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
    content: {
        position: 'absolute',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '1rem',
        outline: 'none',
        padding: '0 0.25rem'
      }
  };

const imageStyle = {
    height: '100%',
    maxHeight: '30rem',
    width: 'auto',
}

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

    const CloseButton = useCallback(styled.button`
        background: none;
        width: 4rem;
        height: 4rem;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        cursor: Pointer;
    `, 
    [onClose]
    );

    const CropWrapper = useCallback(styled.div`
        width: 52rem;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
    `
    , []);

    const BeforeCrop = useCallback(styled.div`
        display: flex;
        width: 52rem;
        height: 30rem;
        background: ${props => props.theme.color.darkbrown };
        color: ${props => props.theme.color.ivory};
        font-size: 3rem;
        justify-content: center;
        align-items: center;
    `, []);

    const ModalHeaderWrap = useCallback(styled.div`
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `, []);

    const ModalTailWrap = useCallback(styled.div`
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
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

    const InputLabel = useCallback(styled.label`
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${props => props.theme.color.yellow};
        padding: 0.5rem;
        border-radius: 1rem;
    `, []);

    const SuccessButton = useCallback(styled.button`
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${props => props.theme.color.green};
        padding: 0.5rem;
        border-radius: 1rem;
        border: none;
    `, []);

    const Button = useCallback(styled.button`
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;

        ${props => {
        const color = props.color!
        const selected = props.theme.color[color];
        return css`
            background: ${selected};
            &:hover {
            background: ${lighten(0.1, selected)};
            }
            &:active {
            background: ${darken(0.1, selected)};
            }
            `;
        }};
    `, []);
    

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={ModalStyles}
        contentLabel="Image Crop Modal"
        >
            <ModalHeaderWrap>
                <CloseButton onClick={onClose}>
                    <MdClose size='100%'/>
                </CloseButton>
            </ModalHeaderWrap>
            {src &&
                <CropWrapper>
                    <ReactCrop 
                        imageStyle={imageStyle} 
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
                <InputLabel htmlFor='imgInput'>
                    <FaFileUpload size='100%'/>
                </InputLabel>
                <InputHiding type='file' onChange={onFileChange} id='imgInput' accept="image/*"/>
                <SuccessButton onClick={onSuccess}>
                    <FaCheck size='100%'/>
                </SuccessButton>
            </ModalTailWrap>
        </Modal>
    );
}

Modal.setAppElement('#root');

export default CropModal;