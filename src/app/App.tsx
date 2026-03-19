import './App.css'
import { AppRouterProvider } from './providers/RouterProvider'
import { ToastProvider } from '../shared/ui/Toast'

function App() {
  return (
    <>
      <AppRouterProvider />
      <ToastProvider />
    </>
  )
}

export default App
