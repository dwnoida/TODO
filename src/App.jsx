import FAB from "./components/FAB/FAB";
import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import "./App.css";
import { useState } from "react";

function App() {
  // React State to store note data
  const [notes, setNotes] = useState([
    {
      title: "",
      notes: [
        ["Note 1 Todo 1", true],
        ["Note 1 Todo 2", false],
      ],
    },
    { title: "", notes: [["Note 2 Todo 1", true]] },
    {
      title: "Note 3",
      notes: [
        ["Note 3 Todo 1", true],
        ["Note 3 Todo 2", false],
        ["Note 3 Todo 3", true],
        ["Note 3 Todo 4", false],
      ],
    },
  ]);

  // Add new node function
  const addNewNotes = () => {
    setNotes((val) => {
      let value = [...val];
      if (
        value.length === 0 ||
        value[value.length - 1].notes.length > 1 ||
        (value[value.length - 1].notes.length === 1 &&
          value[value.length - 1].notes[0][0] !== "")
      )
        value.push({ title: "", notes: [] });
      else {
        document.getElementById("errorToast").classList.add("show");
        document.getElementById("errorToast").classList.remove("hide");
      }
      return value;
    });
  };

  // Delete a note
  const removeNote = (noteIndex) => {
    setNotes((val) => {
      let value = [...val];
      value = value.filter((item, index) => index !== noteIndex);
      return value;
    });
  };

  const editTitle = (noteIndex, title) => {
    setNotes((val) => {
      let value = [...val];
      value[noteIndex].title = title;
      return value;
    });
  };

  // Add New todo function
  const addTodo = (noteIndex) => {
    setNotes((val) => {
      let value = [...val];
      if (
        value[noteIndex].notes.length === 0 ||
        value[noteIndex].notes[value[noteIndex].notes.length - 1][0]
      )
        value[noteIndex].notes.push(["", false]);
      return value;
    });
  };

  // Edit todo in note
  const editTodo = (noteIndex, todoIndex, data) => {
    setNotes((val) => {
      let value = [...val];
      if (typeof data === "string") value[noteIndex].notes[todoIndex][0] = data;
      else value[noteIndex].notes[todoIndex][1] = data;
      return value;
    });
  };

  // Delete todo
  const removeTodo = (noteIndex, todoIndex) => {
    setNotes((val) => {
      let value = [...val];
      value[noteIndex].notes = value[noteIndex].notes.filter(
        (item, index) => index !== todoIndex
      );
      return value;
    });
  };

  return (
    <div>
      <Header />
      <div className="body container-fluid px-sm-2 px-md-3 px-lg-5 py-3">
        <div className="container-fluid">
          <div className="row gy-4">
            {notes.map((note, index) => (
              <Todo
                key={index}
                noteIndex={index}
                data={note}
                updateTitle={editTitle}
                deleteNote={removeNote}
                addTodo={addTodo}
                updateTodo={editTodo}
                deleteTodo={removeTodo}
              />
            ))}
          </div>
        </div>
      </div>
      <FAB addNew={addNewNotes} />

      <div
        class="position-fixed top-0 start-50 translate-middle-x p-3"
        style={{ zIndex: 1100 }}
      >
        <div
          id="errorToast"
          class="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <strong class="me-auto">Error</strong>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => {
                document.getElementById("errorToast").classList.remove("show");
                document.getElementById("errorToast").classList.add("hide");
              }}
            ></button>
          </div>
          <div class="toast-body">Please, fill previous todo first.</div>
        </div>
      </div>
    </div>
  );
}

export default App;
