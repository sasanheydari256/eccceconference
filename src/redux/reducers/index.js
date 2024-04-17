import { combineReducers, createStore } from 'redux';
import Customer from './Customer';
const initialState = {
  changeTabBarIndex: 2,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-TABBAR-INDEX':
      return { ...state, changeTabBarIndex: action.index };
    default:
      return state;
  }
};

const combinedReducers = combineReducers({
  utils: reducer,
  Customer,
});

export default createStore(combinedReducers);
