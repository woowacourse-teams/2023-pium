import { atom } from 'recoil';

interface UserInfo {
  isLogin: boolean;
  id: string;
}

const id = localStorage.getItem('userId') ?? -1;

const initialUserInfo: UserInfo = {
  isLogin: id === -1 ? false : true,
  id: `${id}`,
};

export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: initialUserInfo,
});
