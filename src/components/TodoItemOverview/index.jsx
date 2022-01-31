import "./TodoItemOverview.css";

function TodoItemOverview({ content, status }) {
  return (
    <div className="todoItemOverview">
      {content}
      <span>{status}</span>
    </div>
  );
}

export default TodoItemOverview;
