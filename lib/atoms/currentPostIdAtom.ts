import { atom } from 'recoil';

type InitialState = string;

const initialState: InitialState = '';

export const currentPostIdAtom = atom({
  key: 'currentPostId',
  default: initialState,
});
