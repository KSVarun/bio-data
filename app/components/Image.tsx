import type { FC } from 'react';
import React from 'react';

interface IImage {
  file: File | null;
  handleFileSelect: (file: File) => void;
}

export const Image: FC<IImage> = ({ file, handleFileSelect }) => {
  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files.item(0);
    if (file) {
      handleFileSelect(file);
    }
  }

  function renderUploadedImg(file: File) {
    return (
      <img
        src={URL.createObjectURL(file)}
        alt=''
        style={{ width: 'inherit', height: 'inherit' }}
      />
    );
  }

  function renderUploadBtn() {
    return (
      <div className='upload-btn-container'>
        <label htmlFor='upload'>
          <input
            id='upload'
            hidden
            type='file'
            onChange={onUpload}
            accept='image/jpeg,image/png, image/jpg'
          ></input>
          <div className='upload-btn'>
            <div className='lable'>Upload</div>
          </div>
        </label>
      </div>
    );
  }

  return <>{file ? renderUploadedImg(file) : renderUploadBtn()}</>;
};
