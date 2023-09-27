import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { confirmState } from 'store/atoms/@common';

/**
 * dialog에 confirm을 위한 이벤트 핸들러들을 추가합니다.
 *
 * 1. window.confirm 처럼 backdrop 클릭으로는 닫을 수 없습니다.
 * 2. Esc 키로 닫을 수 있습니다. 이 떄 유저는 'false'를 고른 것으로 간주합니다.
 * 3. dialog가 열린 동안에는 스크린 리더로 다른 요소에 접근할 수 없습니다.
 * 4. dialog가 열린 동안에는 다른 요소를 스크롤할 수 없습니다.
 *
 * @returns effect를 걸 dialog를 찍을 ref
 */
const useConfirmModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef(document.body);
  const { isOpen, setAnswer } = useRecoilValue(confirmState);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = modalRef.current;
    const body = bodyRef.current;

    if (!dialog || !body) return;

    const close = () => {
      setAnswer?.(false);
      dialog.close();
    };

    const closeOnEsc = (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.key === 'Escape') {
        close();
      }
    };

    dialog.showModal();
    body.style.overflowY = 'hidden';
    window.addEventListener('keydown', closeOnEsc);
    window.addEventListener('popstate', close);

    return () => {
      dialog.close();
      body.style.overflowY = 'auto';
      window.removeEventListener('keydown', closeOnEsc);
      window.removeEventListener('popstate', close);
    };
  }, [isOpen, setAnswer]);

  return modalRef;
};

export default useConfirmModal;
