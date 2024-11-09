import { size } from '@/styles/const';
import { style } from '@vanilla-extract/css';

export {
  backStyle,
  backIconStyle,
  pageTitleStyle,
  pageDescriptionStyle,
} from '@/styles/shared.css';

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

export const sectionWrapperStyle = style({
  paddingTop: '4rem',
});

export const headStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem 0',
});

export const itemsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem 0',
});
