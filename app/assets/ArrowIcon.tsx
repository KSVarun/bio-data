import type { FC, SVGProps } from 'react';

export const ArrowIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width='54' height='54' viewBox='0 0 54 54' {...props}>
    <g>
      <path
        d='M27,0C12.112,0,0,12.112,0,27s12.112,27,27,27s27-12.112,27-27S41.888,0,27,0z M27,52C13.215,52,2,40.785,2,27
		S13.215,2,27,2s25,11.215,25,25S40.785,52,27,52z'
      />
      <path
        d='M32.413,14.293c-0.391-0.391-1.023-0.391-1.414,0L19.501,25.791c-0.667,0.667-0.667,1.751,0,2.418l11.498,11.498
		C31.194,39.902,31.45,40,31.706,40s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L21.12,27l11.293-11.293
		C32.804,15.316,32.804,14.684,32.413,14.293z'
      />
    </g>
  </svg>
);
