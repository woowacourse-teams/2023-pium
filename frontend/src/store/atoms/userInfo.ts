import { atom } from 'recoil';

interface UserInfo {
  isLogin: boolean;
}

const sessionId = JSON.parse(sessionStorage.getItem('sessionId') ?? 'none');
console.log(sessionId, 'sessionId');
const initialUserInfo: UserInfo = {
  isLogin: sessionId === 'none' ? false : true,
};

export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: initialUserInfo,
});
