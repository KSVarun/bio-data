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
        <table className='field-container'>
          <tbody>
            {props.fields.map((d) => (
              <tr className='value-field' key={d.id}>
                <td className='label'>{d.label}</td>
                <td className='separator'>:</td>
                <td className='value'>{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
