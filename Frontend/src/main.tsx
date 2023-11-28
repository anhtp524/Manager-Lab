import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './app/store.ts'
import { LoadingProvider } from './common/context/useHandlingApi.tsx'
import { ConfigProvider } from 'antd'
import { AuthProvider } from './common/context/useAuth.tsx'
import type { ThemeConfig } from 'antd'

const config: ThemeConfig = {
  token: {
    motion: false,
    motionBase: 0,
    colorPrimary: '#2566f1',
    // colorInfo: '#9a77f9',
    colorError: '#ec380b',
    colorTextBase: '#212121',
    fontSize: 16,
    borderRadius: 2
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider theme={config}>
      <LoadingProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadingProvider>
    </ConfigProvider>
  </Provider>
)
