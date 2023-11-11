import { useCallback, useEffect, useState } from 'react';
import useCheckSessionId from 'hooks/queries/auth/useCheckSessionId';
import { getCookie, setCookie } from 'utils/cookie';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const useInstallApp = () => {
  const { isSuccess: isLoggedIn } = useCheckSessionId(false);

  const [showPrompt, setShowPrompt] = useState(JSON.parse(getCookie('PromptVisible') ?? 'true'));

  const installApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;
    setShowPrompt(false);
  };

  const ignoreInstallApp = () => {
    setCookie({ key: 'PromptVisible', value: 'false', path: '/reminder' });
    deferredPrompt = null;
    setShowPrompt(false);
  };

  const closePrompt = () => {
    deferredPrompt = null;
    setShowPrompt(false);
  };

  // TODO: 해당 이벤트를 지원하지 않는 브라우저의 경우에 어떻게 처리를 할 것인가?
  const beforeInstallPromptHandler = useCallback(
    (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      if (!showPrompt) return;

      deferredPrompt = event;
    },
    [showPrompt]
  );

  // TODO: 왜 '/'에서만 beforeinstallprompt가 이벤트 추가가 되나?  prompt가 나오고 나머지는 나오지 않는가?
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, [beforeInstallPromptHandler]);

  return { showPrompt: showPrompt && isLoggedIn, installApp, ignoreInstallApp, closePrompt };
};

export default useInstallApp;
