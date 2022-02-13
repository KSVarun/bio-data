import type { FC } from 'react';
import { ArrowIcon } from '~/assets/ArrowIcon';
import { IField } from '~/routes/left-pic';
import { Image } from './Image';

export const BioData: FC<IBioDataProps> = (props) => {
  return (
    <div className='container'>
      <div style={{ fontSize: 30 }}>BIODATA</div>
      <div className='top-container'>
        <div className='img-container'>
          <Image file={props.img} />
        </div>
        <div className='field-container'>
          {props.fields.map((d) => (
            <div className='value-field' key={d.id}>
              <div className='label'>{d.label}</div>
              <div className='separator'>:</div>
              <div className='value'>{d.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div onClick={() => props.handleEdit(true)} className='edit-btn'>
        <ArrowIcon />
      </div>
    </div>
  );
};

interface IBioDataProps {
  img: File;
  fields: IField[];
  handleEdit: (isEditing: boolean) => void;
}
