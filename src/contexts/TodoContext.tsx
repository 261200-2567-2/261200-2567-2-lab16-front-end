import { createContext, Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';

export interface TodoContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});
