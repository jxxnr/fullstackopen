import React, { useState } from 'react';

const Button = ({ handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  );
}

const AnecdoteDisplay = ({ header, anecdote, votes }) => {
  return(
    <div>
      <h3>{header}</h3>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const selectNext = () => {
    let index = selected;
    // Ensure that the new selected anecdote will not be the same as the current displayed anecdote
    while(index === selected) {
      index = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(index);
  }

  const getMostVoted = () => {
    const maxVotes = Math.max(...points);
    return(points.indexOf(maxVotes));
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1;
    setPoints(copy);
  }



  return(
    <div>
      <AnecdoteDisplay header='Anecdote of the day' anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button handleClick={vote} text='vote' />
        <Button handleClick={selectNext} text='next anecdote' />
      </div>
      <AnecdoteDisplay header='Anecdote with most votes' anecdote={anecdotes[getMostVoted()]} votes={points[getMostVoted()]} />
    </div>
  );
}

export default App;
