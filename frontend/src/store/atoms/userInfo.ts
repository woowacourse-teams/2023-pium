import { atom } from 'recoil';

interface UserInfo {
  isLogin: boolean;
}

const initialUserInfo: UserInfo = {
  isLogin: JSON.parse(localStorage.getItem('isLogin') ?? 'false'),
};

export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: initialUserInfo,
});
