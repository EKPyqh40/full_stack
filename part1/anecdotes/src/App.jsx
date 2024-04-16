import { useState } from 'react'

const indexOfMax = (arr) => {
  console.log("indexOfMax", arr)
  if (arr.length === 0) {
      return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

const HighestVote = ({votes, anecdotes}) => {
  console.log("HighestVote", votes, anecdotes)
  const anecdote = anecdotes[indexOfMax(votes)]
  return (
    <>
    <h1>Anecdote with the most votes</h1>
    <p>{anecdote}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const n_anecdotes = anecdotes.length

  const selectRandom = (max) => {
    return Math.floor(Math.random() * max)
  }

  const [selected, setSelected] = useState(selectRandom(n_anecdotes))
  const zeros = new Uint8Array(anecdotes.length)
  const [votes, setVotes] = useState(zeros)

  const incrementVote = () => {
    const new_votes = [...votes]
    new_votes[selected] += 1
    setVotes(new_votes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <button onClick={incrementVote}>vote</button>
      <button onClick={() => setSelected(selectRandom(n_anecdotes))}>next anecdote</button>
      <HighestVote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App