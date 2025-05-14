import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StateProvider } from './contexto/store.jsx'
import { initialState } from './contexto/initialState.jsx'
import { mainReducer } from './contexto/reducers/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider>
    
  </StrictMode>,
)
