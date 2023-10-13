import type { ToastItem } from 'types/@common';
import type { ReactNode } from 'react';
import { atom } from 'recoil';

interface ConfirmState {
  title: string | null;
  message: string;
  isOpen: boolean;
  setAnswer: ((userAnswer: boolean) => void) | null;
}

export const confirmState = atom<ConfirmState>({
  key: 'confirm',
  default: {
    title: null,
    message: '',
    isOpen: false,
    setAnswer: null,
  },
});

export const toastListState = atom<ToastItem[]>({
  key: 'toasts',
  default: [],
});

export const lastPageState = atom<ReactNode>({
  key: 'lastPage',
  default: null,
});

export const isShowPageLoadingState = atom({
  key: 'showPageLoading',
  default: true,
});
