import React from 'react'
import Weather from './components/Weather'

const App = () => {
  return (
    // overflow-hidden scroll ko rokta hai, h-screen height fix karta hai
    <div className='h-screen w-full flex flex-col justify-center items-center bg-[#e2d4ff] overflow-hidden p-4 font-sans'>
      <div className="flex flex-col items-center scale-90 sm:scale-100 transition-transform">
        <h1 className='mb-6 text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600 text-4xl sm:text-5xl font-black tracking-tight'>
          Weather App
        </h1>
        <Weather />
      </div>
    </div>
  )
}

export default App;