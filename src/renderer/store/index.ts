import { configureStore } from '@reduxjs/toolkit';

import commonReducer from './slices/common';
import blockchainReducer from './slices/blockchain';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    blockchain: blockchainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
