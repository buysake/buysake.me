import { style } from '@vanilla-extract/css';

export const titleStyle = style({
  fontSize: '1.4rem',
  color: '#fff',
  transform: 'skewX(-1deg)',
  fontWeight: 'bold',
  letterSpacing: '0.2rem',
  lineHeight: '2.2rem',
});

export const kvsStyle = style({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '1rem',
});

export const kvStyle = style({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '1rem',
});

export const kvIconWrapperStyle = style({
  width: '1.9rem',
  height: '1.9rem',
  borderRadius: '0.5rem',
  background: 'rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  marginRight: '0.5rem',
});

export const kvTextStyle = style({
  fontSize: '0.85rem',
  color: '#eee',
  letterSpacing: '0.1rem',
});
