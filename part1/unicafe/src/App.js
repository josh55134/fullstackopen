import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = ()  => {
    return good + bad + neutral
  }

  const average = ()  => {
    let avg = (good + bad*-1)/sum()
    avg = avg.toFixed(15)
    return avg
  }

  const positive = () => {
    let pos = ( good/sum() )*100
    pos = pos.toFixed(15)
    return pos + ' %'
  }

  if (sum() === 0 ) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={sum()} />
        <Statistic text='average' value={average()} />
        <Statistic text='positive' value={positive()} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App