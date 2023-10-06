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

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const useInstallApp = () => {
  const { isSuccess: isLoggedIn } = useCheckSessionId(false);

  const [showPrompt, setShowPrompt] = useState<boolean>(
    JSON.parse(getCookie('PromptVisible') || 'true')
  );

  const installApp = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();

      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
      });
    }
  };

  const ignoreInstallApp = () => {
    setCookie({ key: 'PromptVisible', value: 'false' });
    setShowPrompt(false);
    deferredPrompt = null;
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };

  const beforeInstallPromptHandler = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    if (!showPrompt) return;

    deferredPrompt = event;
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  return { showPrompt: showPrompt && isLoggedIn, installApp, ignoreInstallApp, closePrompt };
};

export default useInstallApp;
