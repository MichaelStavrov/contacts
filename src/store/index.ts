import { combineReducers, createStore } from 'redux';
import { allContactsReducer } from './reducers/allContactsReducer';

const rootReducer = combineReducers({
  allContacts: allContactsReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
