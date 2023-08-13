import type { ToastItem } from 'types/toast';
import { atom } from 'recoil';

const toasts = atom<ToastItem[]>({
  key: 'toasts',
  default: [],
});

export default toasts;
