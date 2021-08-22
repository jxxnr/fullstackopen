import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>{text}</button>
  );
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  const { good, neutral, bad } = props.score;
  const total = good + neutral + bad;
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / total;
  const positiveFeedback = (good / total) * 100

  if (good + neutral + bad === 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );

  }
  return(
    <div>    
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={`${positiveFeedback} %`} />
        </tbody>
      </table>
    </div>


  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] =  useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button handleClick={handleGood} text='good' />
        <Button handleClick={handleNeutral} text='neutral' />
        <Button handleClick={handleBad} text='bad' />
      </p>
      <Statistics score={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  );
}

export default App;
