import { useState } from 'react';
import type { LinksFunction } from 'remix';
import { Image } from '~/components/Image';
import leftPicStyles from '../../styles/left-pic.css';
import { v4 as uuidv4 } from 'uuid';
import { ArrowIcon } from '~/assets/ArrowIcon';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: leftPicStyles }];
};

const INITAL_FIELDS = [
  {
    id: uuidv4(),
    label: 'Name',
    value: '',
  },
  { id: uuidv4(), label: 'Qualification', value: '' },
  { id: uuidv4(), label: 'Working at', value: '' },
  { id: uuidv4(), label: 'Date of birth', value: '' },
  { id: uuidv4(), label: 'Horoscope', value: '' },
  { id: uuidv4(), label: 'Qualification', value: '' },
  { id: uuidv4(), label: 'Height', value: '' },
  { id: uuidv4(), label: 'Caste', value: '' },
  { id: uuidv4(), label: 'Father', value: '' },
  { id: uuidv4(), label: 'Mother', value: '' },
  { id: uuidv4(), label: 'Siblings', value: '' },
  { id: uuidv4(), label: 'Contact', value: '' },
  { id: uuidv4(), label: 'Residential address', value: '' },
];

export default function LeftPic() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState(INITAL_FIELDS);

  function handleFileSelect(file: File) {
    setFile(file);
  }

  function handleUpdateData(id: string, label: string, value: string) {
    const updatedData = [...data];
    const idx = data.findIndex((d) => d.id === id);
    updatedData[idx] = {
      id,
      label,
      value,
    };
    setData(updatedData);
  }

  function handleAddNewField() {
    setData((data) => [
      ...data,
      {
        id: uuidv4(),
        label: '',
        value: '',
      },
    ]);
  }

  function handleRemoveField(id: string) {
    setData((data) => data.filter((d) => d.id !== id));
  }

  return (
    <div className='container'>
      <div className='top-container'>
        <div className='img-container'>
          <Image file={file} handleFileSelect={handleFileSelect} />
        </div>
        <div className='editable-field-container'>
          {data.map((d) => (
            <div className='editable-field' key={d.id}>
              <div className='left-container'>
                <input
                  type='text'
                  value={d.label}
                  onChange={(e) =>
                    handleUpdateData(d.id, e.target.value, d.value)
                  }
                />
                <span className='separator'>:</span>
                <textarea
                  value={d.value}
                  onChange={(e) =>
                    handleUpdateData(d.id, d.label, e.target.value)
                  }
                  rows={1}
                />
              </div>
              <div
                className='right-container'
                onClick={() => handleRemoveField(d.id)}
              >
                x
              </div>
            </div>
          ))}
          <button className='add-new-btn' onClick={handleAddNewField}>
            ADD NEW
          </button>
        </div>
      </div>
      <div onClick={() => console.log(data)} className='proceed-btn'>
        <ArrowIcon />
      </div>
    </div>
  );
}
