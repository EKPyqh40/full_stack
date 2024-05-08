{
  /* <form onSubmit={addAnecdote}>
<div><input name="anecdote"/></div>
<button type="submmit">add</button>
</form> */
}

import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotificiation,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    console.log("addAnecdote");
    dispatch(setNotificiation(`you added '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification(null));
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
