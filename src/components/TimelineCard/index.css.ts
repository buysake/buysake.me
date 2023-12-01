import { style } from '@vanilla-extract/css';

export const contentStyle = style({
  textDecoration: 'none',
  display: 'block',
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '1.5rem',
  borderRadius: '0.6rem',
});

export const titleStyle = style({
  lineHeight: '150%',
  fontSize: '1rem',
  fontWeight: 'bold',
  letterSpacing: '0.1rem',
  color: '#fff',
  transform: 'skewX(-1deg)',
});

export const metaStyle = style({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0 0',
});

export const hostStyle = style({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '1rem',
});

export const logoStyle = style({
  width: '1rem',
  height: '1rem',
  marginRight: '0.3rem',
});

export const metaTextStyle = style({
  color: '#eee',
  fontSize: '0.8rem',
});
