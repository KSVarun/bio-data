import { useState } from 'react';
import type { LinksFunction } from 'remix';
import { Image } from '~/components/Image';
import leftPicStyles from '../../styles/left-pic.css';
import { v4 as uuidv4 } from 'uuid';
import { ArrowIcon } from '~/assets/ArrowIcon';
import { CancelIcon } from '~/assets/CancelIcon';
import { BioData } from '~/components/BioData';
import clsx from 'clsx';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: leftPicStyles }];
};

const INITAL_FIELDS: IField[] = [
  {
    id: uuidv4(),
    label: 'Name',
    value: 'Manushree MR',
  },
  {
    id: uuidv4(),
    label: 'Qualification',
    value: 'BE (Information Science and Engineering)',
  },
  { id: uuidv4(), label: 'Working at', value: 'Alstom Transport, Bengaluru' },
  {
    id: uuidv4(),
    label: 'Date of birth',
    value: 'October 25th, 1997 11:22 PM, Saturday',
  },
  { id: uuidv4(), label: 'Horoscope', value: 'Simha rashi, Magha nakshatra' },
  { id: uuidv4(), label: 'Height', value: "5'" },
  { id: uuidv4(), label: 'Caste', value: 'Veershaiva Lingayath' },
  {
    id: uuidv4(),
    label: 'Father',
    value: 'Raveesh MR (BA, B.ED) Farmer & Businessman',
  },
  { id: uuidv4(), label: 'Mother', value: 'Yashoda CT Home Maker' },
  { id: uuidv4(), label: 'Siblings', value: '' },
  { id: uuidv4(), label: 'Contact', value: '9980001700' },
  {
    id: uuidv4(),
    label: 'Residential address',
    value: 'Muganahunase, Chelur post Gubbi taluk, Tumakuru Karnataka',
  },
];

export default function LeftPic() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState(INITAL_FIELDS);
  const [editing, setEditing] = useState(true);

  function handleFileSelect(file: File) {
    setFile(file);
  }

  function handleFileDeselect() {
    setFile(null);
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

  function renderEditBioData() {
    return (
      <div className='container'>
        <div style={{ fontSize: 30 }}>BIODATA</div>
        <div className='top-container'>
          <div className='img-container'>
            <Image
              file={file}
              handleFileSelect={handleFileSelect}
              handleFileDeselect={handleFileDeselect}
            />
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
                  <CancelIcon />
                </div>
              </div>
            ))}
            <button className='add-new-btn' onClick={handleAddNewField}>
              ADD NEW
            </button>
          </div>
        </div>
        <div
          onClick={() => handleEdit(false)}
          className={clsx('proceed-btn', !file && 'disabled-proceed-btn')}
        >
          <ArrowIcon />
        </div>
      </div>
    );
  }

  function handleEdit(isEditing: boolean) {
    if (file === null) {
      return;
    }
    setEditing(isEditing);
  }

  function renderBioData() {
    if (!file) {
      return null;
    }
    return <BioData fields={data} img={file} handleEdit={handleEdit} />;
  }

  return editing ? renderEditBioData() : renderBioData();
}

export interface IField {
  id: string;
  label: string;
  value: string;
}
