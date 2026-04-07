import React from 'react'
import Weather from './components/Weather'

const App = () => {
  return (
    <div className='app'>
      <h1 className='flex justify-center items-center text-blue-500/60 text-5xl font-extrabold '>Weather App</h1>
      <Weather />
    </div>
  )
}

export default App
