import { AppRouterProvider } from '@/app/providers/RouterProvider'
import { ToastProvider } from '@/shared/ui/Toast'

function App() {
  return (
    <>
      <AppRouterProvider />
      <ToastProvider />
    </>
  )
}

export default App
