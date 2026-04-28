import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './authSlice.js';
import jobReducer from './jobSlice.js';
import companyReducer from './companyslice.js';
import adminJobReducer from './AdminJobSlice.js'
import applicantsReducer from './ApplicantsSlice.js'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  company: companyReducer,
  adminJobs: adminJobReducer, 
  applicants:applicantsReducer,
   
});

const persistConfig = {
    key: 'root',
    storage,
    // persist auth and jobs so job lists remain after refresh
    whitelist: ['auth' ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export default store;
export { persistor };