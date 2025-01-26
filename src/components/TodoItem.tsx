export interface TodoItemProps {
  id: number;
  index: number;
  completed: boolean;
  title: string;
  handleMarkAsComplete: (id: number) => void;
  handleMarkAsIncomplete: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
}

const TodoItem = ({
  id,
  index,
  completed,
  title,
  handleMarkAsComplete,
  handleMarkAsIncomplete,
  handleDeleteTodo,
}: TodoItemProps) => {
  return (
    <tr
      key={id}
      className={`text-center h-16 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}
    >
      <td className={completed ? 'line-through' : ''}>{title}</td>
      <td>
        <button
          className="px-4 py-2 rounded border-2"
          onClick={() =>
            completed ? handleMarkAsIncomplete(id) : handleMarkAsComplete(id)
          }
        >
          {completed ? 'Mark As Incomplete' : 'Mark As Complete'}
        </button>
      </td>
      <td>
        <button
          className="px-4 py-2 rounded border-2"
          onClick={() => handleDeleteTodo(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
