import { ReactNode, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../contexts/TodoContext';

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
