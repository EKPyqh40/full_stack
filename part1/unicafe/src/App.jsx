import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatsticLine = ({text, value}) => {
  return (
    <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0){
    return (
    <>
    <h1>Statistics</h1>
    <p>No feedback given</p>
    </>)
  }
  return (
    <>
    <h1>statistics</h1>
      <StatsticLine text="good" value={good} />
      <StatsticLine text="neutral" value={neutral} />
      <StatsticLine text="bad" value={bad} />
      <StatsticLine text="all" value={good + neutral + bad} />
      <StatsticLine text="average" value={(good-bad)/(good+neutral+bad)} />
      <StatsticLine text="postive" value={100 * good / (good+neutral+bad)} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={incrementGood} text="good"/>
        <Button onClick={incrementNeutral} text="neutral"/>
        <Button onClick={incrementBad} text="bad"/>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App