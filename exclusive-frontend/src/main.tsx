import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
