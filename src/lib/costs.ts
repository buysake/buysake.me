import { AirdropItem } from './types';

export const AIRDROP_TYPE_COLORS: {
  [k in AirdropItem['types'][0]]: `#${string}`;
} = {
  game: '#12dc88',
  tech: '#499bea',
  daily: '#ffb545',
  only_gas: '#9886e5',
  free: '#c9c940',
  once: '#c74081',
  testnet: '#add7f7',
  favorite: '#fb0fc1',
};

export const AIRDROP_TYPE_NAMES: {
  [k in AirdropItem['types'][0]]: string;
} = {
  game: 'ゲーム系',
  tech: '技術タスク有',
  daily: 'デイリータスク有',
  only_gas: 'gas代のみ',
  free: '原資不要',
  once: '単発タスク',
  testnet: 'テストネット',
  favorite: 'お気に入り',
};
