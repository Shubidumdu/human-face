import React from 'react';
import Modal from 'react-modal';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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

const imageStyle = {
    width: '800px',
    height: '500px'
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

    return (
        <div>
            <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Image Crop Modal"
            >
            <button onClick={onClose}>close</button>
            <div>
                <ReactCrop 
                    imageStyle={imageStyle} 
                    src={src} 
                    onChange={onCropChange} 
                    crop={crop} 
                    onImageLoaded={onImageLoaded}
                    />
                <input type='file' onChange={onFileChange} />
                <button onClick={onSuccess}>완료</button>
            </div>
            </Modal>
        </div>
    );
}

Modal.setAppElement('#root');

export default CropModal;