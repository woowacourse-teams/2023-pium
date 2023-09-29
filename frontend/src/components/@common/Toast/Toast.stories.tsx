import type { ToastItem } from 'types/@common';
import type { Meta, StoryObj } from '@storybook/react';
import useToggle from 'hooks/@common/useToggle';
import Toast from '.';
import ToastList from './ToastList';
import useAddToast from 'hooks/@common/useAddToast';

const ToastItem = (props: ToastItem) => {
  const { isOn, on } = useToggle();

  setTimeout(on);

  return <>{isOn && <Toast {...props} />}</>;
};

const meta: Meta<typeof Toast> = {
  component: Toast,
  render: ToastItem,
  decorators: [
    (Story) => {
      return (
        <>
          <Story />
          <ToastList />
        </>
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
    buttonContent: '확인하러 가기'
  },
};

const Interactive = (props: ToastItem) => {
  const { type, message } = props;
  const addToast = useAddToast();

  const addHandler = () => {
    addToast({type, message, time: 4000});
  };

  return (
    <>
      <button type="button" onClick={addHandler}>
        토스트 추가하기
      </button>
    </>
  );
};

export const ToastWithPopupButton: Story = {
  args: {
    type: 'error',
    message: '새로고침 해주세요',
  },
  render: Interactive,
};
