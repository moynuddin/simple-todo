import classes from "./edit.module.css";

const Edit = ({ handleEditForm, input, setInput, todos }) => {
  return (
    <div>
      <form onSubmit={handleEditForm}>
        <input
          type="text"
          placeholder="Edit todos"
          value={input}
          className={classes.formControl}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className={classes.btn}>
          Edit Todo
        </button>
      </form>
    </div>
  );
};

export default Edit;
