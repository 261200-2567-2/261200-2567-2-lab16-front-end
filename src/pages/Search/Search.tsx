import { useNavigate } from 'react-router';
import useSearchController from './useSearchController';

const Search = () => {
  const navigate = useNavigate();
  const { searchResults, handleMarkAsComplete, handleMarkAsIncomplete } =
    useSearchController();
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
        <div className="w-2/3 flex flex-row gap-4 border-b-2 pb-2">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded border-2 w-full"
          />
          <button className="text-black px-4 py-2 rounded border-2">
            Search
          </button>
        </div>
        <table>
          <tbody>
            {searchResults.map((todo, index) => (
              <tr
                key={todo.id}
                className={`text-center h-16 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}
              >
                <td className={todo.completed ? 'line-through' : ''}>
                  {todo.title}
                </td>
                <td>
                  <button
                    className="px-4 py-2 rounded border-2"
                    onClick={() =>
                      todo.completed
                        ? handleMarkAsIncomplete(todo.id)
                        : handleMarkAsComplete(todo.id)
                    }
                  >
                    {todo.completed ? 'Mark As Incomplete' : 'Mark As Complete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
