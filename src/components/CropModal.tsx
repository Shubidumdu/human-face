import React, {useState} from 'react';
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

}

async function getCroppedImg(image:any, crop:any, fileName:any): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          resolve(blob!);
        }, 'image/png', 1);
      });
}

function CropModal({
    isOpen,
    onClose,
    src,
    onCropChange,
    onFileChange,
    crop,
    setImageUrl,
    setImageBlob
}: ModalProps) {

    const [imageRef, setImageRef] = useState();

    const onImageLoaded = (image : any) => {
        setImageRef(image);
    };


    const onClick = async (e: any) => {
        e.preventDefault();
        makeClientCrop(crop);
        onClose(e);
    }

    const makeClientCrop = async (crop : ReactCrop.Crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
            imageRef,
            crop,
            'FaceImage.png'
            );
            setImageUrl(window.URL.createObjectURL(croppedImageUrl));
            setImageBlob(croppedImageUrl);
        }
    }

    return (
        <div>
            <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Example Modal"
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
                <button onClick={onClick}>완료</button>
            </div>
            </Modal>
        </div>
    );
}

Modal.setAppElement('#root');

export default CropModal;