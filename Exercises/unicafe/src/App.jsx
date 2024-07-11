import { useState } from 'react'

const Statistics = ({ type, count, extra = '' }) => {
  return (
    <tr>
      <td>{type}</td> 
      <td>{count}</td>
      <td>{extra}</td>
    </tr>
  )
}

const FeedbackStatistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <Statistics type="good" count={good} />
      <Statistics type="neutral" count={neutral} />
      <Statistics type="bad" count={bad} />
      <Statistics type="all" count={all} />
      <Statistics type="average" count={average} />
      <Statistics type="positive" count= {positive} extra={'%'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const voteGood = () => {
    const newGood = good + 1
    const newAll = newGood + neutral + bad
    setGood(newGood)
    setAll(newAll)
    setAverage(((newGood - bad) / newAll).toFixed(2))
    setPositive(((newGood / newAll) * 100).toFixed(2));
  }
  
  const voteNeutral = () => {
    const newNeutral = neutral + 1
    const newAll = good + newNeutral + bad
    setNeutral(newNeutral)
    setAll(newAll)
    setAverage(((good - bad) / newAll).toFixed(2))
    setPositive((good / newAll).toFixed(2))
  }
  
  const voteBad = () => {
    const newBad = bad + 1
    const newAll = good + neutral + newBad
    setBad(newBad)
    setAll(newAll)
    setAverage(((good - newBad) / newAll).toFixed(2))
    setPositive((good / newAll).toFixed(2))
  }

  const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={voteGood} text="good" />
      <Button onClick={voteNeutral} text="neutral" />
      <Button onClick={voteBad} text="bad" />

      <div>
        <h2>Statistics</h2>
        <FeedbackStatistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      </div>
    </div>
  )
}

export default App
