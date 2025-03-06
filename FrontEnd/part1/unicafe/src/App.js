import { useState } from "react";
import Header from "./Header";
import Button from "./Button";
import StatisticLine from "./StatisticLine"

const Statistics =({good,neutral,bad})=>{
  
  const total = good+ neutral + bad
  const average = (good - bad)/total
  const positive = good*100/total + '%'
  
  if(total && total>0)
  {
  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
        <tr>
          <td> <StatisticLine text='good' value={good} /></td>
        </tr>
        <tr>
          <td> <StatisticLine text='neutral' value={neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='bad' value={bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='average' value={average} /></td>
        </tr>
        <tr>
          <td><StatisticLine text='positive' value={positive} /></td>
        </tr>
        </tbody>
     </table>
    </div>
  )
  }else{
    return (<div>No feedback given</div>)
  }
 
  
 }

const App=()=> {
  //save clicks for each button to its own state
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)
  
  const goodClick=()=> {
    const updatedGood = good + 1
    setGood(updatedGood)
    
  }

  const neutralClick=()=> {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const badClick=()=> {
    const updatedBad= bad + 1
    setBad(updatedBad)
  }
  
  

  return (
    <div >

      <Header name='give Feedback' />
      <Button text='good' handleClick={()=>setGood(good +1)}/>
      <Button text='neutral' handleClick={()=>setNeutral(neutral +1)}/>
      <Button text='bad' handleClick={()=>setBad(bad +1)}/>
      <Header name='statistics' />
       <p></p>
     
      <Statistics good={good} neutral={neutral} bad={bad} />
      

    </div>
  );
}

export default App;
