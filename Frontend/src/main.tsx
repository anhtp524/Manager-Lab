import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './app/store.ts'
import { LoadingProvider } from './common/context/useHandlingApi.tsx'
import { ConfigProvider } from 'antd'
import { AuthProvider } from './common/context/useAuth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          motion: false
        }
      }}
    >
      <LoadingProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadingProvider>
    </ConfigProvider>
  </Provider>
)
