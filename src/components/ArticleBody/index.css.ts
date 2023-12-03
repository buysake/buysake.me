import { style, globalStyle } from '@vanilla-extract/css';

export const bodyContentStyle = style({});

globalStyle(`${bodyContentStyle} *`, {
  color: '#eee',
});

globalStyle(`${bodyContentStyle} > *`, {
  padding: '0.5rem 0',
  lineHeight: '175%',
  letterSpacing: '0.05rem',
});

globalStyle(`${bodyContentStyle} a`, {
  fontSize: '0.95rem',
  color: '#79976f',
  fontWeight: 'bold',
});

globalStyle(`${bodyContentStyle} p`, {
  fontSize: '0.95rem',
});

globalStyle(`${bodyContentStyle} h1`, {
  padding: '1.5rem 0 0.5rem',
  fontSize: '1.25rem',
});

globalStyle(`${bodyContentStyle} h2`, {
  padding: '1.5rem 0 0.5rem',
  fontSize: '1.15rem',
});

globalStyle(`${bodyContentStyle} h3`, {
  padding: '1.5rem 0 0.5rem',
  fontSize: '1.05rem',
});

globalStyle(`${bodyContentStyle} ul li`, {
  fontSize: '0.95rem',
  listStylePosition: 'inside',
});

globalStyle(`${bodyContentStyle} ul li ul li`, {
  paddingLeft: `$1rem`,
});

globalStyle(`${bodyContentStyle} code`, {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '0.2em 0.4em',
  borderRadius: '0.25rem',
});
