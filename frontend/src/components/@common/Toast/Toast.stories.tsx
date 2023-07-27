import type { Meta, StoryObj } from '@storybook/react';
import useBoolean from 'hooks/useBoolean';
import Toast from '.';

const meta: Meta<typeof Toast> = {
  component: Toast,
  render: (props) => {
    const { boolean: isOpen, on } = useBoolean();

    setTimeout(on);

    return <>{isOpen && <Toast {...props} />}</>;
  },
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
    const { boolean: isOpen, off, on } = useBoolean();

    console.log(isOpen);
    return (
      <>
        <button type="button" onClick={on}>
          토스트 보기
        </button>
        {isOpen && <Toast {...props} toastClose={off} />}
      </>
    );
  },
};
