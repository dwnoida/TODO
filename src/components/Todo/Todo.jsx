import React from "react";
import "./Todo.css";

function Todo({
  data: { title, notes },
  updateTitle,
  deleteNote,
  addTodo,
  updateTodo,
  noteIndex,
  deleteTodo,
}) {
  const TodoItem = ({ details: [txt, done], todoIndex }) => {
    return (
      <div className="todo-item d-flex position-relative align-items-center my-1">
        <input
          className="form-check-input"
          type="checkbox"
          checked={done}
          onChange={(e) => updateTodo(noteIndex, todoIndex, e.target.checked)}
        />
        <div
          type="text"
          className={`form-control todo-input pe-0 
            ${done ? "text-decoration-line-through" : ""}
          `}
          contentEditable
          spellCheck="false"
          onBlur={(e) =>
            updateTodo(noteIndex, todoIndex, e.target.innerText.trim())
          }
        >
          {txt}
        </div>
        <button
          className="close-btn btn btn-sm btn-danger p-0"
          onClick={() => deleteTodo(noteIndex, todoIndex)}
        >
          <i className="bi bi-x"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="todocard-root col-12 col-sm-6 col-md-4">
      <div className="todocard-container rounded-3 py-2 px-3 pb-5">
        <div
          type="text"
          className={`form-control fs-4 fw-bold todo-input title-input`}
          contentEditable
          spellCheck="false"
          onBlur={(e) => updateTitle(noteIndex, e.target.innerText.trim())}
        >
          {title}
        </div>
        {notes.map((val, index) => (
          <TodoItem
            key={index}
            details={val}
            todoIndex={index}
            deleteTodo={deleteTodo}
          />
        ))}
        <button
          className="btn btn-sm btn-dark add-todo-btn"
          onClick={() => addTodo(noteIndex)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          ADD TODO
        </button>

        <button
          className="delete-note-btn btn position-absolute end-0 top-0 translate-middle-y m-1 btn-dark btn-sm rounded-circle"
          onClick={() => {
            // Apply fade animation on delete note
            // 1. FADE
            document
              .getElementsByClassName("todocard-root")
              [noteIndex].classList.add("fade");
            setTimeout(() => {
              // Then Delete
              deleteNote(noteIndex);
              // Remove Fade
              document
                .getElementsByClassName("todocard-root")
                [noteIndex]?.classList.remove("fade");
            }, 400);
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default Todo;
