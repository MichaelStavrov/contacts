import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {
  contactsApiSlice,
  contactsSlice,
  groupsApiSlice,
} from './contactsSlice';

const rootReducer = combineReducers({
  allContacts: contactsSlice.reducer,
  [contactsApiSlice.reducerPath]: contactsApiSlice.reducer,
  [groupsApiSlice.reducerPath]: groupsApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      contactsApiSlice.middleware,
      groupsApiSlice.middleware,
      thunkMiddleware,
    ]);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
