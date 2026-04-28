import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import store, { persistor } from '../redux/store.js'   // <-- Make sure this path is correct
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios';
import { checkAuth, logout } from '../redux/authSlice.js';

// Ensure persisted auth is validated on app start. If session cookie expired,
const onBeforeLift = async () => {
  try {
    await store.dispatch(checkAuth()).unwrap();
  } catch (err) {
    await persistor.purge();
    store.dispatch(logout());
  }

  // Global axios interceptor to handle 401s anywhere in the app on api call
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        await persistor.purge();
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
