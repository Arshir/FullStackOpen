import {useState} from 'react'

const App=()=> {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(anecdotes.map(m=>0))//useState(Array(anecdotes.length).fill(0))
  const [voted,setVoted] = useState(0)
  const [most,setMost] = useState(0)
  console.log('votes initial', votes)
 

 
  const selectAnecdote = ()=>{
      console.log('max',anecdotes.length)
      const num=Math.floor(Math.random() * (anecdotes.length - 0) + 0)
      console.log('random number ', num)
      console.log('selected', num)
      setSelected(num)   
  }

  console.log('selected ',selected)
  const voteAnecdote =()=>{
    console.log('vote before',votes)
    const arr = [...votes]
   
    console.log('selected old vote ',arr[selected])
    
    arr[selected]+=1

    console.log('selected new vote ',arr[selected])
    

    if(arr[selected]> most)
    {
      setMost(arr[selected])
      setVoted(selected)
    }
   
    console.log('vote after', arr)
    setVotes(arr)
  }

  return (
    <div >
      <h1>Anecdote of the day</h1>
     {anecdotes[selected]}
     <p>
     <button onClick={voteAnecdote}>
      vote
      </button>

      <button onClick={selectAnecdote}>
      Next anecdote
      </button>
    </p>
    <h1>Anecdote with most votes</h1>
      {anecdotes[voted]}
    </div>
  );
}

export default App;
