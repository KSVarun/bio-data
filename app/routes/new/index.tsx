import { useState } from 'react';
import { LinksFunction, useLocation } from 'remix';
import { Image } from '~/components/Image';
import newStyles from '../../styles/new.css';
import { v4 as uuidv4 } from 'uuid';
import { ArrowIcon } from '~/assets/ArrowIcon';
import { CancelIcon } from '~/assets/CancelIcon';
import { BioData } from '~/components/BioData';
import clsx from 'clsx';
import { Layouts } from '..';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: newStyles }];
};

const INITAL_FIELDS: IField[] = [
  {
    id: uuidv4(),
    label: 'Name',
    value: '',
  },
  {
    id: uuidv4(),
    label: 'Qualification',
    value: '',
  },
  { id: uuidv4(), label: 'Working at', value: '' },
  {
    id: uuidv4(),
    label: 'Date of birth',
    value: '',
  },
  { id: uuidv4(), label: 'Horoscope', value: '' },
  { id: uuidv4(), label: 'Height', value: '' },
  { id: uuidv4(), label: 'Caste', value: '' },
  {
    id: uuidv4(),
    label: 'Father',
    value: '',
  },
  { id: uuidv4(), label: 'Mother', value: '' },
  { id: uuidv4(), label: 'Siblings', value: '' },
  { id: uuidv4(), label: 'Contact', value: '' },
  {
    id: uuidv4(),
    label: 'Residential address',
    value: '',
  },
];

function useGetSeachParams(queryParams: string[]) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const value: Record<string, string> = {};
  queryParams.forEach((qp) => {
    let val = params.get(qp);
    if (params.has(qp) && val) {
      value[`${qp}`] = val;
    }
  });
  return value;
}

export default function LeftPic() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState(INITAL_FIELDS);
  const [editing, setEditing] = useState(true);
  const queryParams = useGetSeachParams(['orientation']);

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
        <div
          className={clsx(
            'top-container',
            queryParams.orientation === Layouts.RIGHT_PIC &&
              'right-pic-container'
          )}
        >
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
