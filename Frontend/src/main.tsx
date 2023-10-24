import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './app/store.ts'
import { LoadingProvider } from './common/context/useHandlingApi.tsx'
import { ConfigProvider } from 'antd'

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
        <App />
      </LoadingProvider>
    </ConfigProvider>
  </Provider>
)
