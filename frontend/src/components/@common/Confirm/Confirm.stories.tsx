import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import useConfirm from 'hooks/useConfirm';
import Confirm from '.';

const meta: Meta<typeof Confirm> = {
  component: Confirm,
};

export default meta;

interface ToggleExampleProps {
  title: string;
  message: string;
}

const ToggleExample = (props: ToggleExampleProps) => {
  const {
    title = '연탄재 함부로 발로 차지 마라',
    message = '너는 누구에게 한번이라도 뜨거운 사람이었느냐',
  } = props;

  const [answer, setAnswer] = useState<boolean | null>(null);
  const confirm = useConfirm();

  const saveUserAnswer = async () => {
    const userAnswer = await confirm({ title, message });
    if (userAnswer && (await confirm({ message: '정말요?' }))) {
      setAnswer(userAnswer);
    } else {
      setAnswer(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={saveUserAnswer}
        style={{
          width: '100px',
          height: '30px',
          border: '3px solid lightpink',
        }}
      >
        확인받기
      </button>
      <p style={{ marginTop: '10px', fontSize: '2rem' }}>
        대답: {answer === null ? '무응답' : answer ? '네' : '아니오'}
      </p>
      <Confirm />
    </>
  );
};

/**
 * 버튼을 이용해서 실제 상황을 체험할 수 있습니다.
 */
export const Example: StoryObj<typeof ToggleExample> = {
  render: ToggleExample,
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
  },
};
