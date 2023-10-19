import { useEffect, useState } from 'react';
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

const useInstallApp = () => {
  const { isSuccess: isLoggedIn } = useCheckSessionId(false);

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const installApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
  };

  const ignoreInstallApp = () => {
    setCookie({ key: 'PromptVisible', value: 'false' });
    setDeferredPrompt(null);
  };

  const closePrompt = () => {
    setDeferredPrompt(null);
  };

  const beforeInstallPromptHandler = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    const showPrompt = JSON.parse(getCookie('PromptVisible') ?? 'true');

    if (!showPrompt) return;

    setDeferredPrompt(event);
  };

  // TODO: 왜 '/'에서만 beforeinstallprompt가 이벤트 추가가 되나?  prompt가 나오고 나머지는 나오지 않는가?
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  return { showPrompt: deferredPrompt && isLoggedIn, installApp, ignoreInstallApp, closePrompt };
};

export default useInstallApp;
