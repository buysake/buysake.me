import { style } from '@vanilla-extract/css';

export const backStyle = style({
  color: '#eee',
  textDecoration: 'none',
  margin: '0.5rem 0 1rem',
  display: 'inline-block',
});

export const backIconStyle = style({
  width: '1.5rem',
  height: '1.5rem',
});

export const pageTitleStyle = style({
  fontSize: '1.4rem',
  color: '#fff',
  transform: 'skewX(-1deg)',
  fontWeight: 'bold',
  letterSpacing: '0.2rem',
  lineHeight: '2.2rem',
});

export const pageDescriptionStyle = style({
  fontSize: '0.85rem',
  color: '#eee',
  letterSpacing: '0.1rem',
});
