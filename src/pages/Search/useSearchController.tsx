import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useHttpClient } from '../../hooks/useHttpClient';

const useSearchController = () => {
  const httpClient = useHttpClient();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Todo[]>([]);

  const handleSearch = () => {
    httpClient.get<Todo[]>(`/todos?title=${search}`).then((response) => {
      setSearchResults(response);
    });
  };

  const handleMarkAsComplete = (id: number) => {
    httpClient.patch(`/todos/${id}`, { completed: true }).then(() => {
      const updatedTodos = searchResults.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
      setSearchResults(updatedTodos);
    });
  };

  const handleMarkAsIncomplete = (id: number) => {
    httpClient.patch(`/todos/${id}`, { completed: false }).then(() => {
      const updatedTodos = searchResults.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: false };
        }
        return todo;
      });
      setSearchResults(updatedTodos);
    });
  };

  return {
    search,
    setSearch,
    searchResults,
    handleSearch,
    handleMarkAsComplete,
    handleMarkAsIncomplete,
  };
};

export default useSearchController;
