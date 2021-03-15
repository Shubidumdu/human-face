import React, { useState } from 'react';
import CropModal from './CropModal';
import loadImage from 'blueimp-load-image';
import { useDispatch } from 'react-redux';
import { setFormData, setImageURL } from '../modules/action';
import ReactCrop from 'react-image-crop';

const MAX_IMG_WIDTH = 900;
const MAX_IMG_HEIGHT = MAX_IMG_WIDTH / (3 / 4);

function getCroppedImg(
  image: HTMLImageElement,
  crop: ReactCrop.Crop,
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const originWidth = crop.width! * scaleX;
  const originHeight = crop.height! * scaleY;
  let targetWidth = originWidth,
    targetHeight = originHeight;
  if (originWidth > MAX_IMG_WIDTH || originHeight > MAX_IMG_HEIGHT) {
    if (originWidth / originHeight > MAX_IMG_WIDTH / MAX_IMG_HEIGHT) {
      targetWidth = MAX_IMG_WIDTH;
      targetHeight = Math.round(MAX_IMG_WIDTH * (originHeight / originWidth));
    } else {
      targetHeight = MAX_IMG_HEIGHT;
      targetWidth = Math.round(MAX_IMG_HEIGHT * (originWidth / originHeight));
    }
  }
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  console.log(context);

  context.drawImage(
    image,
    crop.x! * scaleX,
    crop.y! * scaleY,
    crop.width! * scaleX,
    crop.height! * scaleY,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        resolve(blob);
      },
      'image/png',
      1,
    );
  });
}

const initialCropState: ReactCrop.Crop = {
  unit: '%',
  height: 100,
  aspect: 3 / 4,
};

type ModalContainerProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CropModalContainer({ isOpen, onClose }: ModalContainerProps) {
  const dispatch = useDispatch();
  const [originImgSrc, setOriginImgSrc] = useState('');
  const [crop, setCrop] = useState<ReactCrop.Crop>(initialCropState);
  const [imageRef, setImageRef] = useState<HTMLImageElement>();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const imgFile = e.target.files?.[0] as File;
    loadImage(
      imgFile,
      (img) => {
        const canvas = img as HTMLCanvasElement;
        const dataURL = canvas.toDataURL('image/png');
        setOriginImgSrc(dataURL);
        setCrop(initialCropState);
      },
      { orientation: true },
    );
  };

  const onCropChange = (crop: ReactCrop.Crop) => {
    setCrop(crop);
  };

  const onConfirm: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!imageRef || !crop.width || !crop.height) return;
    const croppedImageBlob = await getCroppedImg(imageRef, crop);
    const croppedImageURL = window.URL.createObjectURL(croppedImageBlob);
    const formData = new FormData();
    formData.append('image', croppedImageBlob);
    dispatch(setFormData(formData));
    dispatch(setImageURL(croppedImageURL));
    onClose();
  };

  const onImageLoaded = (target: HTMLImageElement) => {
    setImageRef(target);
  };

  return (
    <CropModal
      originImgSrc={originImgSrc}
      isOpen={isOpen}
      onClose={onClose}
      onCropChange={onCropChange}
      onFileChange={onFileChange}
      onImageLoaded={onImageLoaded}
      crop={crop}
      onConfirm={onConfirm}
    />
  );
}

export default CropModalContainer;
