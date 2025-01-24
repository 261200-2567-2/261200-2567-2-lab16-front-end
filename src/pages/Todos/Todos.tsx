import { useRef } from 'react';
import useTodosController from './useTodosController';
import { useNavigate } from 'react-router';

const Todos = () => {
  const navigate = useNavigate();
  const {
    state,
    setState,
    todos,
    addTodoTitle,
    setAddTodoTitle,
    handleCreateTodo,
    handleMarkAsComplete,
    handleMarkAsIncomplete,
    handleDownloadTodos,
    handleUploadTodos,
  } = useTodosController();
  const borderInactive = 'border-2 border-transparent';
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-full w-full flex flex-col px-4 py-8 gap-4 items-center">
        <div className="w-full grid grid-cols-3 gap-4 px-4 py-2">
          <div className="flex flex-row gap-4 justify-self-start">
            <button
              className="text-black px-4 py-2 rounded border-2"
              onClick={handleDownloadTodos}
            >
              Download Todos
            </button>
            <button
              className="text-black px-4 py-2 rounded border-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Todos
            </button>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const todos = JSON.parse(e.target?.result as string);
                    handleUploadTodos(todos);
                  };
                  reader.readAsText(file);
                }
              }}
            />
          </div>
          <div className="text-3xl text-center font-bold justify-self-center">
            Todo App
          </div>
          <div className="flex flex-row gap-4 justify-self-end">
            <button
              className="text-black px-4 py-2 rounded border-2"
              onClick={() => navigate('/search')}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col w-2/3 gap-4">
          <div className="flex flex-row justify-between border-b-2 pb-2">
            <button
              onClick={() => setState('all')}
              className={`px-4 py-2 rounded text-black ${state === 'all' ? 'border-2' : borderInactive}`}
            >
              All
            </button>
            <button
              onClick={() => setState('completed')}
              className={`px-4 py-2 rounded text-black ${state === 'completed' ? 'border-2' : borderInactive}`}
            >
              Completed
            </button>
            <button
              onClick={() => setState('incomplete')}
              className={`px-4 py-2 rounded text-black ${state === 'incomplete' ? 'border-2' : borderInactive}`}
            >
              Incomplete
            </button>
          </div>
          {todos.length !== 0 ? (
            <table>
              <tbody>
                {todos.map((todo, index) => (
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
                        {todo.completed
                          ? 'Mark As Incomplete'
                          : 'Mark As Complete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">No Todos Found</div>
          )}
          <div className="flex flex-row justify-between border-t-2 pt-2">
            <input
              type="text"
              placeholder="Enter Todo Title"
              className="px-4 py-2 rounded border-2"
              value={addTodoTitle}
              onChange={(e) => setAddTodoTitle(e.target.value)}
            />
            <button
              className="px-4 py-2 rounded border-2"
              onClick={() => {
                handleCreateTodo(addTodoTitle);
                setAddTodoTitle('');
              }}
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
