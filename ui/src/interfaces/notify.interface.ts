import { CursorItem } from './item.interface';

export interface Notify {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export const initialCursorState: CursorItem<Notify> = {
  success: true,
  message: null,
  items: [],
  nextCursor: null,
  hasNextPage: false,
  total: 0,
};
