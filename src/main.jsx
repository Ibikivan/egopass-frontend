import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ProfileContextProvider } from './hooks/useProfil.jsx'
import { ToastContextProvider } from './hooks/useToast.jsx'
import Toast from './components/UI/Toast.jsx'

const queryClient = new QueryClient

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileContextProvider>
      <ToastContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toast message="Notif générique" />
        </QueryClientProvider>
      </ToastContextProvider>
    </ProfileContextProvider>
  </StrictMode>,
)
