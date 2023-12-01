import { style } from '@vanilla-extract/css';

export const contentStyle = style({
  padding: '0 0.5rem 0 1rem',
});

export const emptySpaceStyle = style({
  padding: '1rem 0',
});

export const dateBlockStyle = style({
  borderLeft: 'solid 2px #666',
});

export const headStyle = style({
  padding: '0 2rem',
  position: 'relative',
});

export const headIconStyle = style({
  width: '3rem',
  height: '3rem',
  borderRadius: '100px',
  background: '#1f2328',
  border: 'solid 0.5rem #1f2328',
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translate(-50%, -50%)',
});

export const headIconInnerStyle = style({
  borderRadius: '100px',
  width: '100%',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#eee',
});

export const headTextStyle = style({
  fontSize: '0.8rem',
  color: '#eee',
  letterSpacing: '0.1rem',
});

export const itemsWrapperStyle = style({
  padding: '1rem 0rem 2rem 2rem',
});

export const itemWrapperStyle = style({
  paddingBottom: '1rem',
});
