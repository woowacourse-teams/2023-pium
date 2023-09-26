import type { ToastItem } from 'types/toast';
import { atom } from 'recoil';

interface ConfirmState {
  title: string | null;
  message: string;
  isOpen: boolean;
  setAnswer: ((userAnswer: boolean) => void) | null;
}

export const confirm = atom<ConfirmState>({
  key: 'confirm',
  default: {
    title: null,
    message: '',
    isOpen: false,
    setAnswer: null,
  },
});

export const toasts = atom<ToastItem[]>({
  key: 'toasts',
  default: [],
});
