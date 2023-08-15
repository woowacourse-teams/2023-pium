import { atom } from 'recoil';

interface UserInfo {
  isLogin: boolean;
}

const sessionId = localStorage.getItem('sessionId');

const initialUserInfo: UserInfo = {
  isLogin: sessionId === null ? false : true,
};

export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: initialUserInfo,
});
