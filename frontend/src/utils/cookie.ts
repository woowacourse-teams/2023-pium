type Cookie = 'PromptVisible';

interface CookieParams {
  key: Cookie;
  value: string;
  expire?: number;
}

export const setCookie = ({ key, value, expire = 2592000 }: CookieParams) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value
  )}; max-age=${expire}; path=/`;
};

export const getCookie = (cookieKey: Cookie): string | null => {
  const cookie = document.cookie;

  const cookieValue = cookie.split('; ').reduce((acc, cur) => {
    const [key, value] = cur.split('=');

    if (cookieKey === key) {
      return acc + value;
    }

    return acc;
  }, '');

  return cookieValue.length === 0 ? null : cookieValue;
};
