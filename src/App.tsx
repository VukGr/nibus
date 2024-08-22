import React, { useState } from 'react'
import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

function Test({ text }: { text: string }) {
  return <Button>{text}</Button>
}

function Main() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <Test text='Test' />
      <div className='card'>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Main />
    </ThemeProvider>
  )
}

export default App
