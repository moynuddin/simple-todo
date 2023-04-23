import { useState, useEffect } from "react";
import classes from "./todo.module.css";
import TodoList from "@/components/todo-list";
import Edit from "../Edit";

const Todo = () => {
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(-1);
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const getTodos = JSON.parse(localStorage.getItem("todo"));
    if (getTodos) {
      setTodos(getTodos);
    }
  }, []);

  useEffect(() => {
    if (isDone) {
      // curTodo && (curTodo.current.style.textDecoration = "line-through");
      // curTodo &&
      //   (curTodo.current.parentElement.style.backgroundColor = "#f1f1f1");
      // curTodo && (curTodo.current.style.color = "#c1c1c1");
    }
  }, [isDone]);

  const handleForm = (e) => {
    e.preventDefault();
    if (input.trim() === "") return alert("Enter todo");

    const updatedTodo = [
      ...todos,
      { name: input, isCompleted: false, id: crypto.randomUUID() },
    ];
    setTodos(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
    setInput("");
  };

  const handleRemove = (id) => {
    const updatedTodo = todos.filter((item) => item.id != id);
    setTodos(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };

  const handleDoneTodo = (id, curTodo, i) => {
    const newTodo = [...todos];
    newTodo[i].isCompleted = true;

    if (newTodo[i].isCompleted) {
      curTodo.current.style.textDecoration = "line-through";
      curTodo.current.parentElement.style.backgroundColor = "#f1f1f1";
      curTodo.current.style.color = "#c1c1c1";

      setIsDone(true);
    }
    setTodos(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo));
  };

  const handleEdit = (item, _, i) => {
    setIndex(i);

    setIsEditing(true);
    setInput(item.name);
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    const updateTodo = [...todos];
    updateTodo[index].name = input;
    setTodos(updateTodo);
    setIsEditing(false);
    setInput("");
  };

  return (
    <div className={classes.wrapper}>
      <h1>My Todo list</h1>
      {isEditing ? (
        <Edit
          handleEditForm={handleEditForm}
          input={input}
          setInput={setInput}
          todos={todos[0]}
        />
      ) : (
        <div>
          <form onSubmit={handleForm}>
            <input
              type="text"
              placeholder="Add todos"
              value={input}
              className={classes.formControl}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={classes.btn}>
              Add Todo
            </button>
          </form>

          <TodoList
            todos={todos}
            handleRemove={handleRemove}
            handleDoneTodo={handleDoneTodo}
            handleEdit={handleEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
