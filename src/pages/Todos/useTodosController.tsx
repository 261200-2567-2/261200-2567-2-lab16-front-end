import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Todo } from '../../types/Todo';

const useTodosController = () => {
  const httpClient = useHttpClient();
  const { todos, setTodos } = useContext(TodoContext);
  const [addTodoTitle, setAddTodoTitle] = useState('');
  const [state, setState] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    httpClient.get<Todo[]>('/todos').then((response) => {
      setTodos(response);
    });
  }, [httpClient, setTodos]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) => {
        if (state === 'all') return true;
        if (state === 'completed') return todo.completed;
        if (state === 'incomplete') return !todo.completed;
        return false;
      }),
    );
  }, [state, todos]);

  const handleCreateTodo = (title: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleMarkAsComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleMarkAsIncomplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDownloadTodos = () => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(todos)], {
      type: 'application/json',
    });
    a.href = URL.createObjectURL(file);
    a.download = 'todos.json';
    a.click();
  };

  const handleUploadTodos = (todos: Todo[]) => {
    setTodos(todos);
  };

  return {
    state,
    setState,
    addTodoTitle,
    setAddTodoTitle,
    filteredTodos,
    handleCreateTodo,
    handleMarkAsComplete,
    handleMarkAsIncomplete,
    handleDownloadTodos,
    handleUploadTodos,
  };
};

export default useTodosController;
