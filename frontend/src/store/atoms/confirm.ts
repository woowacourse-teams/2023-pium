import { atom } from 'recoil';

interface ConfirmState {
  title: string | null;
  message: string;
  isOpen: boolean;
  setAnswer: ((userAnswer: boolean) => void) | null;
}

const confirm = atom<ConfirmState>({
  key: 'confirm',
  default: {
    title: null,
    message: '',
    isOpen: false,
    setAnswer: null,
  },
});

export default confirm;
