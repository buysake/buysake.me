import { size } from '@/styles/const';
import { style } from '@vanilla-extract/css';

export { backStyle, backIconStyle } from '@/styles/shared.css';

export const contentStyle = style({
  margin: '0 auto',
  maxWidth: size.contentMaxWidth,
  padding: size.contentPadding,

  '@media': {
    'screen and (max-width: 720px)': {
      padding: size.contentPaddingSp,
    },
  },
});

export const metadataWrapperStyle = style({
  padding: '4rem 0',
});

export const bodyWrapperStyle = style({
  borderTop: 'solid 1px rgba(255, 255, 255, 0.1)',
  padding: '4rem 0',
});
