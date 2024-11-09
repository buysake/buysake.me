import { parseISO } from 'date-fns';
import { AirdropItem } from '@/lib/types';
import airdrops from '../../../airdrops/list.json';

export const getAirdropList = () => {
  return airdrops
    .map((v) => ({
      ...v,
      date: parseISO(v.date),
    }))
    .sort((v) => (v.date < v.date ? -1 : 1)) as AirdropItem[];
};
