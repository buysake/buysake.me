import { AirdropItem } from './types';

export const AIRDROP_TYPE_COLORS: {
  [k in AirdropItem['types'][0]]: `#${string}`;
} = {
  game: '#12dc88',
  tech: '#499bea',
  easy: '#ef6f08',
  daily: '#ffb545',
  only_gas: '#9886e5',
  free: '#c9c940',
  once: '#c74081',
};

export const AIRDROP_TYPE_NAMES: {
  [k in AirdropItem['types'][0]]: string;
} = {
  game: 'ゲーム系',
  tech: '技術タスク有',
  easy: '手軽',
  daily: 'デイリータスク有',
  only_gas: 'gas代のみ',
  free: '原資不要',
  once: '単発タスク',
};
