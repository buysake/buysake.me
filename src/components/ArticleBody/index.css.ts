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
  paddingLeft: `1rem`,
});

globalStyle(`${bodyContentStyle} img`, {
  width: '100%',
});

globalStyle(`${bodyContentStyle} code`, {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '0.2em 0.4em',
  borderRadius: '0.25rem',
});

globalStyle(`${bodyContentStyle} .ogp`, {
  display: 'flex',
  textDecoration: 'none',
  border: 'solid 1px #484848',
  borderRadius: '0.3rem',
  position: 'relative',
  height: '8.5rem',
  '@media': {
    'screen and (max-width: 720px)': {
      height: 'auto',
    },
  },
});

globalStyle(`${bodyContentStyle} .ogp .img`, {
  display: 'flex',
  height: '100%',
  '@media': {
    'screen and (max-width: 720px)': {
      display: 'none',
    },
  },
});

globalStyle(`${bodyContentStyle} .ogp .img .empty`, {
  aspectRatio: '1/1',
  background: '#ccc',
  display: 'flex',
  borderRadius: '0.25rem 0 0 0.25rem',
});

globalStyle(`${bodyContentStyle} .ogp .img img`, {
  height: '100%',
  borderRadius: '0.25rem 0 0 0.25rem',
});

globalStyle(`${bodyContentStyle} .ogp .text`, {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
  overflow: 'hidden',
});

globalStyle(`${bodyContentStyle} .ogp .text span`, {});

globalStyle(`${bodyContentStyle} .ogp .text span.title`, {
  fontSize: '0.85rem',
  fontWeight: 'bold',
  color: '#eee',
  letterSpacing: '0.05rem',
  overflow: 'hidden',
  display: '-webkit-box',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

globalStyle(`${bodyContentStyle} .ogp .text span:not(.title)`, {
  fontSize: '0.8rem',
  fontWeight: 'normal',
  color: '#ccc',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '100%',
});
