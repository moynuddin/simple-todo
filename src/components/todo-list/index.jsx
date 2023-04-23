import { useRef, useEffect, createRef, useState } from "react";
import classes from "./todoList.module.css";
import Image from "next/image";

import close from "../../../public/images/close.png";
import check from "../../../public/images/check.png";
const TodoList = ({ todos, handleRemove, handleDoneTodo, handleEdit }) => {
  const todo = useRef([]);

  todo.current = todos.map((el, i) => todo.current[i] ?? createRef());

  return (
    <div>
      {todos.length < 1 ? (
        <p className={classes.notodos}> No todos here!</p>
      ) : (
        <div>
          {todos?.map((item, i) => (
            <div key={item.id} className={classes.items}>
              <p
                ref={todo.current[i]}
                className={classes.todoItems}
                // value={item.name}
                // onChange={(e) => e.target.value}
                onClick={() => handleEdit(item, todo.current[i], i)}
              >
                {item.name}
              </p>

              <div className={classes.operation}>
                <span
                  onClick={() => handleDoneTodo(item.id, todo.current[i], i)}
                  className={classes.done}
                  title="Done Todo"
                >
                  <Image src={check} width={15} height={15} alt="done" />{" "}
                </span>
                <span
                  onClick={() => handleRemove(item.id)}
                  className={classes.delete}
                  title="Delete Todo"
                >
                  <Image src={close} width={15} height={15} alt="done" />{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
