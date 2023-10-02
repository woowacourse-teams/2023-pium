import { useEffect, useRef } from 'react';
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
  const installAppRef = useRef<HTMLDivElement>(null);

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        if (installAppRef.current) {
          installAppRef.current.style.display = 'none';
        }
      });
    }
  };

  const ignoreInstallApp = () => {
    setCookie({ key: 'PromptVisible', value: 'false' });

    deferredPrompt = null;
    if (installAppRef.current) {
      installAppRef.current.style.display = 'none';
    }
  };

  const beforeInstallPromptHandler = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    const showPrompt = JSON.parse(getCookie('PromptVisible') || 'true');

    if (!showPrompt) return;

    deferredPrompt = event;
    if (installAppRef.current) {
      installAppRef.current.style.display = 'flex';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  return { installApp, ignoreInstallApp, installAppRef };
};

export default useInstallApp;
