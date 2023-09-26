import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { confirmState } from 'store/atoms/@common';
import { ERROR } from 'constants/index';

interface ConfirmParams {
  message: string;
  title?: string;
}

/**
 * 모달을 통해 사용자의 승인 또는 거절 입력을 유도하는 함수를 반환합니다.
 *
 * `window.confirm`과 비슷해요. 버튼 클릭 이외의 상호작용은 불가능합니다.
 * 하지만 Promise를 반환하기 때문에 .then 또는 await를 사용해야 합니다.
 * @param confirmText Confirm 창에 담을 내용을 담은 객체
 * @param confirmText.title 제목 (optional)
 * @param confirmText.message 내용
 * @returns 모달을 열고, 사용자의 승인 여부를 담은 Promise를 반환하는 함수
 */
const useConfirm = () => {
  const setConfirmState = useSetRecoilState(confirmState);

  const confirm = useCallback(
    (confirmText: ConfirmParams) => {
      const { title = null, message } = confirmText;

      const userAnswer = new Promise<boolean>((resolve) => {
        const resolveAndClose = (userAnswer: boolean) => {
          resolve(userAnswer);
          setConfirmState((prev) => ({ ...prev, isOpen: false }));
        };

        setConfirmState(({ isOpen: prevIsOpen }) => {
          if (prevIsOpen) throw new Error(ERROR.simultaneousConfirm);

          return {
            title,
            message,
            isOpen: true,
            setAnswer: resolveAndClose,
          };
        });
      });

      return userAnswer;
    },
    [setConfirmState]
  );

  return confirm;
};

export default useConfirm;
