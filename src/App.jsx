import React from 'react'
import Card from './components/card'


const App = () => {
  return (
   <main className='p-8 select-none'>
    <header className='font-bold font-titles text-base'>
      <span className='font-titles bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-1 rounded-sm tracking-wide'>Projects / Seus projetos</span>
      <h1 className='font-titles text-2xl text-white font-bold mt-1'>Boards</h1>
    </header>

    <section className='flex gap-3 mt-12'>
      <Card columnTitle='Progress'/>
      <Card columnTitle='Review'/>
      <Card columnTitle='Completed'/>
    </section>
   </main>
  )
}

export default App
