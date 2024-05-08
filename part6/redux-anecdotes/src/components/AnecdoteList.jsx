import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotificiation,
  removeNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const clickAnecdote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotificiation(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification(null));
    }, 5000);
  };
  return (
    <>
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => -a.votes + b.votes)
        .map((anecdote) => {
          console.log("anecdote", anecdote);
          return (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => clickAnecdote(anecdote)}
            />
          );
        })}
    </>
  );
};

export default AnecdoteForm;
