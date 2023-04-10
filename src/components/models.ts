import { Timestamp } from 'firebase/firestore';

export interface Todo {
  id: string;
  content: string;
  done: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Meta {
  totalCount: number;
}
