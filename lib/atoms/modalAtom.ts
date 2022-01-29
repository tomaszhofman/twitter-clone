import { atom } from 'recoil';

type InitialState = boolean;

const initialState: InitialState = false;

export const modalState = atom({
  key: 'modalState',
  default: initialState,
});
