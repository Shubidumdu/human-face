import React from 'react';
import ReactCrop from 'react-image-crop';
import { MdFileUpload, MdClose, MdCheck } from 'react-icons/md';
import Modal from 'styled-react-modal';
import styled, { DefaultTheme } from 'styled-components';
import Button from './Button';
import 'react-image-crop/dist/ReactCrop.css';

const StyledModal = Modal.styled`
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) =>
      theme.color.grey};
    background: ${({ theme }: { theme: DefaultTheme }) => theme.color.beige};
    overflow: auto;
    border-radius: 1rem;
    outline: none;
    padding: 0 0.5rem;

    @media (max-width: 850px) {
        width: 95%;
        height: auto;
    }

    .ReactCrop__image {
      height: 100%;
      max-height: 30rem;
      width: auto;
    }
    
    @media (max-width: 820px) {
      .ReactCrop__image {
        width: auto;
        height: auto;
        max-height: 25rem;
      }
    }
  `;

const CropWrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  display: flex;
  border: 2px solid ${({ theme }) => theme.color.black};
  align-items: center;
  justify-content: center;
`;

const BeforeCrop = styled.div`
  display: flex;
  width: 52rem;
  height: 30rem;
  background: ${(props) => props.theme.color.darkbrown};
  color: ${({ theme }) => theme.color.white};
  border: 2px solid ${({ theme }) => theme.color.black};
  font-size: 3rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 850px) {
    width: 100%;
    height: 20rem;
    font-size: 1.5rem;
  }
`;

const ModalHeaderWrap = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 850px) {
    height: 3rem;
  }
`;

const ModalTailWrap = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 850px) {
    height: 3rem;
  }
`;

const InputHiding = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

type ModalProps = {
  originImgSrc: string;
  crop: ReactCrop.Crop;
  isOpen: boolean;
  onClose: () => void;
  onCropChange: (
    crop: ReactCrop.Crop,
    percentCrop: ReactCrop.PercentCrop,
  ) => void;
  onFileChange: React.ChangeEventHandler<HTMLInputElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onImageLoaded: (target: HTMLImageElement) => void;
};

function CropModal({
  isOpen,
  crop,
  originImgSrc,
  onClose,
  onConfirm,
  onCropChange,
  onFileChange,
  onImageLoaded,
}: ModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
    >
      <ModalHeaderWrap>
        <Button size="tiny" type="button" onClick={onClose} color="red">
          <MdClose size="100%" />
        </Button>
      </ModalHeaderWrap>
      {originImgSrc ? (
        <CropWrapper>
          <ReactCrop
            src={originImgSrc}
            onChange={onCropChange}
            crop={crop}
            onImageLoaded={onImageLoaded}
          />
        </CropWrapper>
      ) : (
        <BeforeCrop>이미지 파일을 불러와주세요.</BeforeCrop>
      )}
      <ModalTailWrap>
        <Button type="label" size="tiny" htmlFor="imgInput" color="yellow">
          <MdFileUpload size="100%" />
        </Button>
        <InputHiding
          type="file"
          onChange={onFileChange}
          id="imgInput"
          accept="image/*"
        />
        <Button size="tiny" type="button" onClick={onConfirm} color="green">
          <MdCheck size="100%" />
        </Button>
      </ModalTailWrap>
    </StyledModal>
  );
}

export default CropModal;
