import { style } from '@vanilla-extract/css';

export const contentStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const iconWrapperStyle = style({
  paddingRight: '1.5rem',
});

export const iconStyle = style({
  border: 'solid 0.35rem rgba(255, 255, 255, 0.1)',
  width: '6rem',
  height: '6rem',
  borderRadius: '100%',
});

export const textWrapperStyle = style({
  color: '#fff',
});

export const nameStyle = style({
  fontSize: '1.2rem',
  color: '#fff',
  letterSpacing: '0.1rem',
  fontWeight: '500',
});

export const biographyStyle = style({
  lineHeight: '150%',
  fontSize: '0.9rem',
  color: '#eee',
  paddingTop: '0.5rem',
  letterSpacing: '0.05rem',
});

export const linksStyle = style({
  paddingTop: '0.75rem',
  display: 'flex',
  alignItems: 'center',
});

export const linkLabelStyle = style({
  padding: '0.35rem 0.5rem',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '4px',
  marginRight: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#eee',
});

export const linkLabelIconStyle = style({
  marginRight: '0.35rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const linkLabelTextStyle = style({
  fontSize: '0.9rem',
});
