import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from './actions';

// What we need to do is set up a function that will know how to take in our state and update it through our reducer() function. Luckily, we'll lean on another React Hook, called useReducer()!
import { useReducer } from 'react';

//export 方便测试
export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // if it's none of these actions, do not update state at all and keep things the same!
    default:
      return state;
  }
};

// help initialize our global state object and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function.

// 按照官方的说法：对于复杂的state操作逻辑，嵌套的state的对象，推荐使用useReducer。
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
