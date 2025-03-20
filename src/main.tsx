import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/intercepters';
import App from './App.tsx'
import { Providers } from './redux/provider.tsx';
import { ToastContainer } from 'react-toastify';
  

createRoot(document.getElementById('root')!).render(
    <Providers>
      <ToastContainer />
      <App />
    </Providers>
)
