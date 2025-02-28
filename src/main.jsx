import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ProfileContextProvider } from './hooks/useProfil.jsx'

const queryClient = new QueryClient

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ProfileContextProvider>
  </StrictMode>,
)
