import { Link } from 'remix';
import type { LinksFunction } from 'remix';
import indexStyles from '../styles/index.css';
import { useState } from 'react';
import clsx from 'clsx';
import { ProfileIcon } from '~/assets/profileIcon';
import { ArrowIcon } from '~/assets/ArrowIcon';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: indexStyles }];
};

enum Layouts {
  LEFT_PIC = 'left-pic',
  RIGHT_PIC = 'right-pic',
}

export default function Index() {
  const [selectedLayout, setSelectedLayout] = useState('');

  function updateSelected(layout: string) {
    setSelectedLayout(layout);
  }

  return (
    <div className='container'>
      <h1>Choose a layout</h1>
      <div className='card-container'>
        <div
          className={clsx(
            selectedLayout === Layouts.LEFT_PIC ? 'selected' : ''
          )}
        >
          <div
            className='card left-pic-card'
            onClick={() => updateSelected(Layouts.LEFT_PIC)}
          >
            <Card />
          </div>
        </div>
        <div
          className={clsx(
            selectedLayout === Layouts.RIGHT_PIC ? 'selected' : ''
          )}
        >
          <div
            className='card right-pic-card'
            onClick={() => updateSelected(Layouts.RIGHT_PIC)}
          >
            <Card />
          </div>
        </div>
      </div>
      <Link className='next-btn' to={selectedLayout}>
        <ArrowIcon />
      </Link>
    </div>
  );
}

function Card() {
  return (
    <>
      <div className='img-card-placeholder'>
        <ProfileIcon />
      </div>
      <div className='field-container'>
        <div className='field'></div>
        <div className='field'></div>
        <div className='field'></div>
        <div className='field'></div>
        <div className='field'></div>
        <div className='field'></div>
      </div>
    </>
  );
}
