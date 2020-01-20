import React, {useState} from 'react';
import CropModal from '../components/CropModal';

type ModalContainerProps = {
    isOpen: boolean;
    onClose: (e: any) => void;
    setImageBlob: React.Dispatch<React.SetStateAction<Blob | undefined>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

function CropModalContainer({
    isOpen,
    onClose,
    setImageBlob,
    setImageUrl
}: ModalContainerProps) {
    const [src, setSrc] = useState('');
    const [crop, setCrop] = useState<ReactCrop.Crop>(
        {
            unit: "%",
            height: 100,
            aspect: 3 / 4
        });


    const onFileChange = (e: any) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
    }    

    const onCropChange = (crop: ReactCrop.Crop, percentCrop: ReactCrop.PercentCrop) => {
        setCrop(crop);
    }

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

    return <CropModal
        src={src}
        isOpen={isOpen} 
        onClose={onClose}
        onCropChange={onCropChange}
        onFileChange={onFileChange}
        crop={crop}
        setImageUrl={setImageUrl}
        setImageBlob={setImageBlob}
        onSuccess={onClick}
        onImageLoaded={onImageLoaded}
        />
}

export default CropModalContainer;