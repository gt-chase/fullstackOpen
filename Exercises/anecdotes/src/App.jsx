import { useState } from 'react'

const Button = ( { onClick, text }) => <button onClick={onClick}>{text}</button>
const Display = ({ anecdotes, quoteIndex }) => {
  return (
  <div>{anecdotes[quoteIndex]}</div>
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
  const choiceAmt = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [voteTracker, setVoteTracker] = useState(Array(choiceAmt).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotesIndex, setMostVotesIndex] = useState(0)

  function randomQuote() {
    const randomIndex = Math.floor(Math.random() * choiceAmt);
    setSelected(randomIndex);
  }

  function vote() {
    const newVoteTracker = [...voteTracker];
    newVoteTracker[selected] += 1;
    setVoteTracker(newVoteTracker);
    console.log(newVoteTracker)
    highestVote(newVoteTracker)
    highestVoteIndex(newVoteTracker)
  }

  function highestVote(voteTracker) {
    setMostVotes(voteTracker.indexOf(Math.max(...voteTracker)))
  }
  function highestVoteIndex(voteTracker) {
    setMostVotesIndex(voteTracker[voteTracker.indexOf(Math.max(...voteTracker))])
  }

  return (
    <div>
      <h1>Anecdote of the moment</h1>
      <Display anecdotes={anecdotes} quoteIndex={selected} />
      <Button onClick={randomQuote}
      text="Show random quote"
      />
      <Button onClick={vote}
      text="Vote"
      />
      <h1>Anecdote with the most votes.</h1>
      <Display anecdotes={anecdotes} quoteIndex={mostVotes} />
      <p>Has {mostVotesIndex} votes</p>
    </div>
  )
}

export default App