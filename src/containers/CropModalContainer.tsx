import React, {useState} from 'react';
import CropModal from '../components/CropModal';
import { ModalProps } from '../components/CropModal';

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

    return <CropModal
        src={src}
        isOpen={isOpen} 
        onClose={onClose}
        onCropChange={onCropChange}
        onFileChange={onFileChange}
        crop={crop}
        setImageUrl={setImageUrl}
        setImageBlob={setImageBlob}
        />
}

export default CropModalContainer;