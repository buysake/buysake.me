import { size } from '@/styles/const';
import { style } from '@vanilla-extract/css';

export const contentStyle = style({
  margin: '0 auto 4rem',
  maxWidth: size.contentMaxWidth,
  padding: size.contentPadding,
});

export const sectionWrapperStyle = style({
  paddingTop: '4rem',
});
