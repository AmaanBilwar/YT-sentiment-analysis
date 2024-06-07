import React from 'react'
import './App.css'
import basicFunc from './basicFunc'



function App() {

  
  return (
    <>
      
<h1>Youtube Sentiment analysis</h1>
<div >
  <form >
    <input  type='url' placeholder='Enter the link here' />
  </form>
  </div>
  <div id='button'>
    <button id='test' onClick={basicFunc()} className='p-2 rounded bg-orange-50'>Submit</button>
    </div>
    </>
  )
}

export default App
