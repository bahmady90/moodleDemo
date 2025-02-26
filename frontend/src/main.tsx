import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuizContextProvider from './context/quiz-context.tsx'
import App from './App.tsx'
import FormContextProvider from './context/form-context.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormContextProvider>
      <QuizContextProvider>
        <App />
      </QuizContextProvider>
    </FormContextProvider> 
  </StrictMode>,
)
