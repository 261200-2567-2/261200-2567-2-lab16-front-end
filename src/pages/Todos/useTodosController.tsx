import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { useHttpClient } from '../../hooks/useHttpClient';
import { Todo } from '../../types/Todo';

const useTodosController = () => {
  const httpClient = useHttpClient();
  const { todos, setTodos } = useContext(TodoContext);
  const [addTodoTitle, setAddTodoTitle] = useState('');
  const [state, setState] = useState<'all' | 'completed' | 'incomplete'>('all');

  useEffect(() => {
    httpClient.get<Todo[]>('/todos/').then((response) => {
      setTodos(response);
    });
  }, [httpClient, setTodos]);

  useEffect(() => {
    if (state === 'completed') {
      httpClient.get<Todo[]>('/todos/?status=true').then((response) => {
        console.log(response);
        setTodos(response);
      });
    } else if (state === 'incomplete') {
      httpClient.get<Todo[]>('/todos/?status=false').then((response) => {
        setTodos(response);
      });
    } else {
      httpClient.get<Todo[]>('/todos/').then((response) => {
        setTodos(response);
      });
    }
  }, [httpClient, setTodos, state]);

  const handleCreateTodo = (title: string) => {
    httpClient.post<Todo>('/todos/', { title }).then((response) => {
      setTodos([...todos, response]);
    });
  };

  const handleMarkAsComplete = (id: number) => {
    httpClient.put(`/todos/${id}`, { completed: true }).then(() => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
      setTodos(updatedTodos);
    });
  };

  const handleMarkAsIncomplete = (id: number) => {
    httpClient.put(`/todos/${id}`, { completed: false }).then(() => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: false };
        }
        return todo;
      });
      setTodos(updatedTodos);
    });
  };

  const handleDeleteTodo = (id: number) => {
    httpClient.delete(`/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  const handleDownloadTodos = () => {
    httpClient.get<Todo[]>('/todos/').then((response) => {
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(response)], {
        type: 'application/json',
      });
      a.href = URL.createObjectURL(file);
      a.download = 'todos.json';
      a.click();
    });
  };

  const handleUploadTodos = (todos: Todo[]) => {
    httpClient.post<Todo[]>('/todos/', todos).then(() => {
      setTodos(todos);
    });
  };

  return {
    state,
    setState,
    todos,
    addTodoTitle,
    setAddTodoTitle,
    handleCreateTodo,
    handleMarkAsComplete,
    handleMarkAsIncomplete,
    handleDeleteTodo,
    handleDownloadTodos,
    handleUploadTodos,
  };
};

export default useTodosController;
