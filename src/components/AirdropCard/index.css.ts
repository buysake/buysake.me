import { AIRDROP_TYPE_COLORS } from '@/lib/costs';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const contentStyle = style({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem 0',
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '1.5rem',
  borderRadius: '0.6rem',
});

export const rowStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem 0',
});

export const rowHeadStyle = style({
  fontWeight: 'bold',
  fontSize: '0.6rem',
  color: '#aaa',
  letterSpacing: '0.1rem',
});

export const titleStyle = style({
  lineHeight: '150%',
  fontSize: '1rem',
  fontWeight: 'bold',
  letterSpacing: '0.1rem',
  color: '#fff',
  transform: 'skewX(-1deg)',
});

export const tagsWrapperStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export const tagStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0 0.5rem',
  padding: '0.25rem 0.5rem',
  border: 'solid 1px #555',
  borderRadius: '100px',
});

export const tagDotStyle = recipe({
  base: {
    width: '0.35rem',
    aspectRatio: '1/1',
    borderRadius: '100%',
  },
  variants: {
    type: Object.keys(AIRDROP_TYPE_COLORS).reduce(
      (acc, k) => ({
        ...acc,
        [k]: {
          background:
            AIRDROP_TYPE_COLORS[k as keyof typeof AIRDROP_TYPE_COLORS],
        },
      }),
      {}
    ) as { [k in keyof typeof AIRDROP_TYPE_COLORS]: {} },
  },
});

export const tagTextStyle = style({
  fontSize: '0.75rem',
  color: '#fff',
});

export const descriptionStyle = style({
  fontSize: '0.85rem',
  lineHeight: '1.2rem',
  color: '#fff',
  letterSpacing: '0.1rem',
  whiteSpace: 'pre-wrap',
});

export const linksWrapperStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export const linkStyle = style({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
});

export const linkIconStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.25rem',
  color: '#222',
  background: '#41c984',
  borderRadius: '4px 0 0 4px',
});

export const linkTextStyle = style({
  fontSize: '0.75rem',
  color: '#fff',
  padding: '0.25rem 0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0 4px 4px 0',
  background: '#222',
  letterSpacing: '0.1rem',
});

export const projectStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0 0.25rem ',
});

export const projectLinkIconStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#aaa',
});
