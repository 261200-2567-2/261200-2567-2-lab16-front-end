import { useNavigate } from 'react-router';
import useSearchController from './useSearchController';
import TodoItem from '../../components/TodoItem';

const Search = () => {
  const navigate = useNavigate();
  const {
    searchResults,
    search,
    setSearch,
    handleSearch,
    handleDeleteTodo,
    handleMarkAsComplete,
    handleMarkAsIncomplete,
  } = useSearchController();
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-full w-full flex flex-col px-4 py-8 gap-4 items-center">
        <div className="w-full grid grid-cols-3 gap-4 px-4 py-2">
          <div className="flex flex-row gap-4 justify-self-start">
            <button
              className="text-black px-4 py-2 rounded border-2"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          <div className="text-3xl text-center font-bold justify-self-center">
            Todo App
          </div>
        </div>
        <div className="flex flex-col w-2/3 gap-4">
          <div className="flex flex-row gap-4 border-b-2 pb-2">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded border-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="text-black px-4 py-2 rounded border-2"
              onClick={() => handleSearch()}
            >
              Search
            </button>
          </div>
          <table>
            <tbody>
              {searchResults.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  index={index}
                  completed={todo.completed}
                  title={todo.title}
                  handleMarkAsComplete={handleMarkAsComplete}
                  handleMarkAsIncomplete={handleMarkAsIncomplete}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Search;
