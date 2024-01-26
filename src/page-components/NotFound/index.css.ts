import { style } from '@vanilla-extract/css';

export const contentStyle = style({
  height: ['100vh', '100svh'],
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const titleStyle = style({
  fontSize: '3rem',
  letterSpacing: '0.2rem',
  color: '#fff',
});
