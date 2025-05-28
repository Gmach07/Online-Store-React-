import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StateProvider } from './contexto/store.jsx'
import { initialState } from './contexto/initialState.jsx'
import { mainReducer } from './contexto/reducers/index.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);