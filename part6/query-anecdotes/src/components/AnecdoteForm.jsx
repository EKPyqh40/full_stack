import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const notification = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      notification({
        type: "SET",
        content: `you added '${newAnecdote.content}'`,
      });
      setTimeout(() => {
        notification({ type: "CLEAR" });
      }, 5 * 1000);
    },
    onError: (request) => {
      notification({
        type: "SET",
        content: request.response.data.error,
      });
      setTimeout(() => {
        notification({ type: "CLEAR" });
      }, 5 * 1000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
