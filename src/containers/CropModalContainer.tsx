import React, {useState} from 'react';
import CropModal from '../components/CropModal';
import loadImage from 'blueimp-load-image';

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

    const initialCrop:ReactCrop.Crop = {
        unit: "%",
        height: 100,
        aspect: 3 / 4
    }

    const [src, setSrc] = useState('');
    const [crop, setCrop] = useState<ReactCrop.Crop>(initialCrop);


    const onFileChange = (e: any) => {
        try {
          loadImage( e.target.files[0], function (img) {
            const imgCanvas = img as HTMLCanvasElement;
            const base64data = imgCanvas.toDataURL('image/png');
            setSrc(base64data); },
            {orientation: true, }
          );
          
          setCrop(initialCrop);
        } 
        catch (e) {
            return;
        }
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
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        var originWidth = crop.width * scaleX;
        var originHeight = crop.height * scaleY;
        var maxWidth = 1200, maxHeight = 1200 / (16 / 9);
        var targetWidth = originWidth,
          targetHeight = originHeight;
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // set canvas size
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d")!;
    
        ctx.drawImage(
          image, 
          crop.x * scaleX, 
          crop.y * scaleY, 
          crop.width * scaleX, 
          crop.height * scaleY, 
          0, 
          0, 
          targetWidth, 
          targetHeight 
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