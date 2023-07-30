import type { Meta, StoryObj } from '@storybook/react';
import ToastProvider from 'contexts/toastContext';
import useBoolean from 'hooks/useBoolean';
import useToast from 'hooks/useToast';
import Toast from '.';
import ToastList from './ToastList';

const meta: Meta<typeof Toast> = {
  component: Toast,
  render: (props) => {
    const { boolean: isOpen, on } = useBoolean();

    setTimeout(on);

    return <>{isOpen && <Toast {...props} />}</>;
  },
  decorators: [
    (Story) => {
      return (
        <ToastProvider>
          <Story />
          <ToastList />
        </ToastProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const InfoWithTitle: Story = {
  args: {
    type: 'info',
    message: '피움 서비스의 정보 입니다.',
    title: '제목이 있는 피움 서비스의 정보입니다.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: '성공했어요!',
  },
};

export const ToastWithPopupButton: Story = {
  args: {
    type: 'error',
    message: '새로고침 해주세요',
  },
  render: (props) => {
    const { addToast } = useToast();
    const addHandler = () => {
      addToast('error', props.message);
    };

    return (
      <button type="button" onClick={addHandler}>
        토스트 추가하기
      </button>
    );
  },
};
