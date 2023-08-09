import { atom } from 'recoil';

interface UserInfo {
  isLogin: boolean;
  id: number;
}

const initialUserInfo: UserInfo = {
  isLogin: false,
  id: -1,
};

export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: initialUserInfo,
});
