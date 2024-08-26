import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GuitarApp } from './GuitarApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GuitarApp />
  </StrictMode>,
)
